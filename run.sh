# CLEANUP
sh kill.sh

# BACKEND
cd back
nohup uvicorn main:app --reload &
cd ..

# FRONTEND
cd front
nohup npm start &
cd ..
