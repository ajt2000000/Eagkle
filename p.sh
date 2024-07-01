sudo systemctl start ssh.service
nohup -c ngrok tunnel --label edge=edghts_2iKGNfleSyyq2qMiJV6UiN3jlhY http://localhost:8081
echo NgrokSTART
cd eaglerproxy-EaglerProxyAAS
cd build
sudo node index.js
