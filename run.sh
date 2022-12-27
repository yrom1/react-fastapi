# SETUP
ln -s $(pwd)/star-schema/stardb.py $(pwd)/back/stardb.py
source ~/PRIVATE/GH_PRIVATE.sh

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
