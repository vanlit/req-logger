set -e

echo "building the js app..."
npx tsc

echo "copying npm deps data..."
cp package* ./app/

echo "building the docker image..."
docker build --tag=logga .

echo ""
echo "BUILD DONE"