# Etapa 1: Construção da aplicação Angular
FROM node:22 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Etapa 2: Servindo a aplicação Angular
FROM nginx:1.23
COPY --from=build /app/dist/expense_tracker_frontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]