# 基本イメージの選択
FROM node:21-slim

RUN apt-get update && apt-get install -y \
    git \
    libgtk-3.0 \
    libnss3 \
    libdrm-dev \
    libasound2 \
    fonts-ipaexfont \
    # sass
    sass \
    # build 
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libdbus-1-3 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libcairo2 \
    libasound2 \
    && rm -rf /var/lib/apt/lists/*

RUN npm init --yes
RUN npm install -g npm@10.2.2
RUN npm install -g @vivliostyle/cli
RUN npm install -g sass

ENTRYPOINT ["vivliostyle"]
EXPOSE 8080
