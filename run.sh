# BACKEND
cd back
nohup uvicorn main:app --reload &
cd ..

# FRONTEND
cd front
nohup npm start &
cd ..

# ENJOY
open http://127.0.0.1:3000
