# Build stage
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and download dependencies
COPY backend/pom.xml ./pom.xml
RUN mvn dependency:resolve dependency:resolve-plugins

# Copy source code
COPY backend/src ./src

# Build the application and verify the JAR file
RUN mvn clean package -DskipTests && \
    echo "=== Build Complete ===" && \
    echo "Contents of target directory:" && \
    ls -lah target/ && \
    echo "=== JAR Files Found ===" && \
    find target -name "*.jar" -type f

# Runtime stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the built JAR from build stage (now uses finalName from pom.xml)
COPY --from=build /app/target/expense-tracker.jar app.jar

# Expose port (Railway will override with $PORT)
EXPOSE 8080

# Run the application
ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT:-8080} -jar app.jar"]
