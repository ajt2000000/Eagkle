sudo ngrok config add-authtoken 2DZnmKRzmQtZURdDRrCQusfkcnd_6sDTv3t7JQRe2QySoPu8i
sudo systemctl start ssh.service
sudo nohup ngrok tunnel --label edge=edghts_2iKGNfleSyyq2qMiJV6UiN3jlhY http://localhost:8081
sudo echo NgrokSTART
cd eaglerproxy-EaglerProxyAAS
cd build
sudo node index.js
