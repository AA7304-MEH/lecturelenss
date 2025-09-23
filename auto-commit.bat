@echo off
cd /d "d:\lecturelens"
git add .
git commit -m "%~1"
git push
echo.
echo ✅ Changes committed and pushed to GitHub!
echo.