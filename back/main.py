import datetime
from functools import cache
from os import environ
from random import choice, random
from subprocess import run
from typing import *  # type: ignore

import pandas as pd
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

# mostly copying bits from
# https://testdriven.io/blog/fastapi-react/
# Im guessing this is 3000 because it's React's default ¯\_(ツ)_/¯
origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def root():
    return {"Hello": "World"}

@app.get("/quote", response_class=PlainTextResponse)
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
    # TODO I'd prefer to return JSON with these attributes so I can style the parts differently!
    return '"' + q.quote + '"' + " — " + q.author + ', ' + q.book


@app.get("/projects/{name}")
async def projects(name: str):
    token = environ['GH_TOKEN']
    headers = {'Authorization': 'Bearer ' + token}
    url = f'https://api.github.com/repos/yrom1/{name}'
    response = requests.get(url, headers=headers)
    j = response.json()
    return {
        "name": j['name'],
        "readme": highlight(requests.get(f"https://raw.githubusercontent.com/yrom1/{name}/main/README.md").text),
        "tagline": j['description']
    }

def format_data(data: List[Tuple[datetime.date, float]]):
    return {
        'x': [date for date, _ in data],
        'y': [value for _, value in data],
    }

@app.get("/plots/{name}")
async def plots(name: str):# -> Dict[Tuple[datetime.date, float]]:
    WHERE = "where ft.date >= DATE_SUB(CURRENT_DATE, INTERVAL 14 DAY)"
    if name == 'strava_runs':
        with StarSchema() as rds:
            q = rds.query(f"""
            select ft.date date
                , ds.distance_km distance
            from fact_table ft
                inner join dimension_strava ds
                    on ft.id_strava = ds.id
            {WHERE}
            """)
        return format_data(q)
    if name == 'leetcode_questions':
        with StarSchema() as rds:
            q = rds.query(f"""
            select ft.date date
                , dl.python3_problems + dl.mysql_problems
            from fact_table ft
                inner join dimension_leetcode dl
                    on ft.id_leetcode = dl.id
            {WHERE}
            """)
        return format_data(q)
    if name == 'leetcode_submissions':
        with StarSchema() as rds:
            q = rds.query(f"""
            select ft.date date
                , dl.submissions
            from fact_table ft
                inner join dimension_leetcode dl
                    on ft.id_leetcode = dl.id
            {WHERE}
            """)
        return format_data(q)

# def projects():
    # ans = ""
    # for project in projects:
    #     ans += (
    #         f'<h3 style="text-align: left;"><a href="#{project}">'
    #         + project
    #         + "</a></h3>"
    #         + f'<p>{projects[project]["tagline"]}</p>'
    #     )
    # ans += "<hr>"
    # ans += "<hr>".join(
    #     [
    #         # a lil hacky to get hyperlinks to titles
    #         # depends on first line of every readme being a title which can replace
    #         f'<a href="#">⬆</a><h1 id="{project}">{project} — <a href="https://github.com/yrom1/{project}" target="_blank">source</a></h1>'
    #         + "\n".join(
    #             markdown_readme_to_html(projects[project]["readme"]).splitlines()[1:]
    #         )
    #         for project in projects
    #     ]
    # )
