# ITAM-frontend

```shell
docker run \
    --rm \
    -e SONAR_HOST_URL="http://sonarqube.ad.supalta.com" \
    -e SONAR_SCANNER_OPTS="-Dsonar.projectKey=ITAM-frontend" \
    -e SONAR_TOKEN="sqp_cb50e164730576a6980b1442f474f59f804aa1be" \
    -v "./:/usr/src" \
    sonarsource/sonar-scanner-cli
```