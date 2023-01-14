# SETUP
rm -rf $(pwd)/back/stardb.py
ln -s $(pwd)/star-schema/stardb.py $(pwd)/back/stardb.py
source ~/PRIVATE/GH_PRIVATE.sh
source ~/PRIVATE/STAR_SCHEMA_PRIVATE.sh

# CLEANUP
sh kill.sh

# BACKEND
cd back
nohup uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
cd ..

# FRONTEND
cd front
nohup npm start &
cd ..
