from random import choice

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse

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
