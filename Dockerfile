FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

# Copy all portfolio files
COPY index.html             /usr/share/nginx/html/
COPY style.css              /usr/share/nginx/html/
COPY app.js                 /usr/share/nginx/html/
# Place your resume PDF in this folder named exactly:
# Tushar_Dhere_Resume.pdf
COPY Tushar_Dhere_Resume.pdf /usr/share/nginx/html/ 2>/dev/null || true

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
