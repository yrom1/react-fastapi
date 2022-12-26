import json
import os
from functools import cache
from random import choice, random
from subprocess import run

import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse
from markdown_code_blocks import highlight

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
    return '"' + q.quote + '"' + " — " + q.author + ', ' + q.book


@app.get("/projects/{name}")
async def projects(name: str):
    token = os.environ['GH_TOKEN']
    headers = {'Authorization': 'Bearer ' + token}
    url = f'https://api.github.com/repos/yrom1/{name}'
    response = requests.get(url, headers=headers)
    j = response.json()
    print(j)
    return {
        "name": j['name'],
        "readme": highlight(requests.get(f"https://raw.githubusercontent.com/yrom1/{name}/main/README.md").text),
        "tagline": j['description']
    }


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
