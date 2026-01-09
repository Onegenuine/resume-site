FROM gradle:8.5-jdk17 AS build
WORKDIR /app
COPY build.gradle settings.gradle ./
COPY gateway-service ./gateway-service
COPY common ./common
RUN gradle :gateway-service:build -x test --no-daemon

FROM --platform=linux/amd64 amazoncorretto:17-alpine
WORKDIR /app
COPY --from=build /app/gateway-service/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

