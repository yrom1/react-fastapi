# usage: sh run.sh [dev|build]

# SETUP
git submodule update --init --recursive
rm -rf $(pwd)/back/stardb.py
ln -s $(pwd)/star-schema/stardb.py $(pwd)/back/stardb.py
. ~/PRIVATE/GH_PRIVATE.sh
. ~/PRIVATE/STAR_SCHEMA_PRIVATE.sh

# CLEANUP
sh kill.sh

# BACKEND
cd back
python3 -m pip install -r dev-requirements.txt
nohup python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
cd ..

# FRONTEND
rm -rf ./front/build/
cd front
npm install
if [ "$1" = "dev" ]; then
    nohup npm start &
else
    npm run build
    nohup serve -s build &
fi
cd ..
# npm install -g serve
# serve -s build
