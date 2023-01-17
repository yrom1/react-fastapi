import datetime
from os import environ
from random import choice, random
from subprocess import run
from typing import *  # type: ignore

import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse
from markdown_code_blocks import highlight
from mysql.connector import connect
from mysql.connector.connection import MySQLConnection
from stardb import StarSchema

_DEBUG = False

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"Hello": "World"}


@app.get("/quote")  # , response_class=PlainTextResponse)
def quote():
    class RandomQuote:
        def __init__(self):
            self._quotes = [
                # (quote, author, book)
                (
                    "With computers available, it is a waste to perform calculations by hand.",
                    "Taiichi Ohno",
                    "Toyota Production System Beyond Large-Scale Production",
                ),
                (
                    "The numbers have no way of speaking for themselves. We speak for them. We imbue them with meaning.",
                    "Nate Silver",
                    "The Signal and the Noise",
                ),
            ]
            for quote in self._quotes:
                assert len(quote) == 3
            self._index = choice(range(len(self._quotes)))

        @property
        def quote(self):
            return self._quotes[self._index][0]

        @property
        def author(self):
            return self._quotes[self._index][1]

        @property
        def book(self):
            return self._quotes[self._index][2]

    q = RandomQuote()
    return {"quote": q.quote, "author": q.author, "book": q.book}


@app.get("/projects/{name}")
async def projects(name: str):
    token = environ["GH_TOKEN"]
    headers = {"Authorization": "Bearer " + token}
    url = f"https://api.github.com/repos/yrom1/{name}"
    response = requests.get(url, headers=headers)
    j = response.json()
    return {
        "name": j["name"],
        # "readme": highlight(
        #     requests.get(
        #         f"https://raw.githubusercontent.com/yrom1/{name}/main/README.md"
        #     ).text
        # ),
        "description": j["description"],
        "link": f"https://github.com/yrom1/{j['name']}",
    }


def format_data(data: List[Tuple[datetime.date, float]]):
    return {
        "x": [date for date, _ in data],
        "y": [value for _, value in data],
    }


@app.get("/plots/{name}")
async def plots(name: str):  # -> Dict[Tuple[datetime.date, float]]:
    if name == "strava_runs":
        with StarSchema() as rds:
            q = rds.query(
                f"""
            select ft.date date
                , ds.distance_km distance
                , sum(ds.distance_km) over(order by date) total
            from fact_table ft
                inner join dimension_strava ds
                    on ft.id_strava = ds.id
            where ft.date >= DATE_SUB(CURRENT_DATE, INTERVAL 14 DAY)
            """
            )
        # return format_data(q)
        return {
            "x": [date for date, _, __ in q],
            "y": [value for _, value, __ in q],
            "z": [value for _, __, value in q],
        }
    if name == "leetcode_questions":
        with StarSchema() as rds:
            q = rds.query(
                f"""
            select ft.date date
                , dl.python3_problems + dl.mysql_problems
            from fact_table ft
                inner join dimension_leetcode dl
                    on ft.id_leetcode = dl.id
            where ft.date >= DATE_SUB(CURRENT_DATE, INTERVAL 14 DAY)
            """
            )
        return format_data(q)
    if name == "leetcode_submissions":
        with StarSchema() as rds:
            q = rds.query(
                f"""
            select ft.date date
                , dl.submissions
            from fact_table ft
                inner join dimension_leetcode dl
                    on ft.id_leetcode = dl.id
            where ft.date >= DATE_SUB(CURRENT_DATE, INTERVAL 14 DAY)
            """
            )
        return format_data(q)
