FROM php:8.2-apache

# Instalar dependencias necesarias para CURL (usado en proxy_discord.php)
RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    && docker-php-ext-install curl

# Copiar archivos del proyecto
COPY . /var/www/html/

# Configurar permisos para Apache
RUN chown -R www-data:www-data /var/www/html

# Ajustar puerto para Render (Apache por defecto usa 80, Render lo mapeará)
EXPOSE 80
