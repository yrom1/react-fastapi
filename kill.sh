lsof -t -i :3000 | xargs kill -9
lsof -t -i :8000 | xargs kill -9
