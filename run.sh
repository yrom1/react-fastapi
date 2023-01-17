# SETUP
git submodule update --init --recursive
rm -rf $(pwd)/back/stardb.py
ln -s $(pwd)/star-schema/stardb.py $(pwd)/back/stardb.py
source ~/PRIVATE/GH_PRIVATE.sh
source ~/PRIVATE/STAR_SCHEMA_PRIVATE.sh

# CLEANUP
sh kill.sh

# BACKEND
cd back
python3 -m pip install -r dev-requirements.txt
nohup python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
cd ..

# FRONTEND
cd front
npm install
nohup npm start &
cd ..
# npm install -g serve
# serve -s build
