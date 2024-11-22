CREATE TABLE "Dorms" (
        dorm_id BIGSERIAL NOT NULL, 
        name VARCHAR(255) NOT NULL, 
        address VARCHAR(255) NOT NULL, 
        PRIMARY KEY (dorm_id)
)

CREATE TABLE "Users" (
        user_id BIGSERIAL NOT NULL, 
        first_name VARCHAR(255) NOT NULL, 
        second_name VARCHAR(255) NOT NULL, 
        third_name VARCHAR(255), 
        phone VARCHAR(25) NOT NULL, 
        tg VARCHAR(50), 
        role role NOT NULL, 
        dorm_id BIGINT NOT NULL, 
        hashed_password VARCHAR(255) NOT NULL, 
        deleted_at TIMESTAMP WITHOUT TIME ZONE, 
        PRIMARY KEY (user_id), 
        UNIQUE (phone), 
        FOREIGN KEY(dorm_id) REFERENCES "Dorms" (dorm_id)
)

CREATE TABLE "Floors" (
        floor_id BIGSERIAL NOT NULL, 
        dorm_id BIGINT NOT NULL, 
        owner_id BIGINT NOT NULL, 
        floor_number BIGINT NOT NULL, 
        renovated_date TIMESTAMP WITHOUT TIME ZONE, 
        PRIMARY KEY (floor_id), 
        FOREIGN KEY(dorm_id) REFERENCES "Dorms" (dorm_id), 
        FOREIGN KEY(owner_id) REFERENCES "Users" (user_id)
)

CREATE TABLE "Notes" (
        note_id BIGSERIAL NOT NULL, 
        user_id BIGINT NOT NULL, 
        dorm_id BIGINT NOT NULL, 
        room VARCHAR(255) NOT NULL, 
        description TEXT NOT NULL, 
        created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
        deleted_at TIMESTAMP WITHOUT TIME ZONE, 
        PRIMARY KEY (note_id), 
        FOREIGN KEY(user_id) REFERENCES "Users" (user_id), 
        FOREIGN KEY(dorm_id) REFERENCES "Dorms" (dorm_id)
)

CREATE TABLE "Rooms" (
        room_id BIGSERIAL NOT NULL, 
        floor_id BIGINT NOT NULL, 
        block_number BIGINT NOT NULL, 
        room_number BIGINT, 
        PRIMARY KEY (room_id), 
        FOREIGN KEY(floor_id) REFERENCES "Floors" (floor_id)
)

CREATE TABLE "Violations" (
        violation_id BIGSERIAL NOT NULL, 
        user_id BIGINT NOT NULL, 
        document_type documenttype NOT NULL, 
        violator_name VARCHAR(255) NOT NULL, 
        violation_type violationtype NOT NULL, 
        description TEXT NOT NULL, 
        room_id BIGINT NOT NULL, 
        witness VARCHAR(255) NOT NULL, 
        created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
        deleted_at TIMESTAMP WITHOUT TIME ZONE, 
        PRIMARY KEY (violation_id), 
        FOREIGN KEY(user_id) REFERENCES "Users" (user_id), 
        FOREIGN KEY(room_id) REFERENCES "Rooms" (room_id)
)
