CREATE TYPE documenttype AS ENUM ('act', 'warning');
CREATE TYPE violationtype AS ENUM ('drink_alcohol', 'passage_alcohol', 'keeping_alcohol', 'fire_security', 'electrical_security', 'noise_mode', 'guest_mode', 'unsanitation_block', 'unsanitation_room', 'unsanitation_general_place', 'break_mode', 'block_thing');
CREATE TYPE role AS ENUM ('headman', 'operative', 'admin', 'soo_leader', 'spectator');

CREATE TABLE "Dorms" (
        dorm_id BIGSERIAL NOT NULL,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        PRIMARY KEY (dorm_id)
);

CREATE TABLE "Users" (
        user_id BIGSERIAL NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        second_name VARCHAR(255) NOT NULL,
        third_name VARCHAR(255),
        phone VARCHAR(25) NOT NULL,
        tg VARCHAR(50),
        role VARCHAR(50) NOT NULL,
        dorm_id BIGINT NOT NULL,
        hashed_password VARCHAR(255) NOT NULL,
        deleted_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL,
        PRIMARY KEY (user_id),
        UNIQUE (phone),
        FOREIGN KEY(dorm_id) REFERENCES "Dorms" (dorm_id)
);

CREATE TABLE "Floors" (
        floor_id BIGSERIAL NOT NULL,
        dorm_id BIGINT NOT NULL,
        owner_id BIGINT NOT NULL,
        floor_number BIGINT NOT NULL,
        renovated_date TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL,
        PRIMARY KEY (floor_id),
        FOREIGN KEY(dorm_id) REFERENCES "Dorms" (dorm_id),
        FOREIGN KEY(owner_id) REFERENCES "Users" (user_id)
);

CREATE TABLE "Notes" (
        note_id BIGSERIAL NOT NULL,
        user_id BIGINT NOT NULL,
        dorm_id BIGINT NOT NULL,
        room VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL ,
        deleted_at TIMESTAMP WITHOUT TIME ZONE default NULL,
        PRIMARY KEY (note_id),
        FOREIGN KEY(user_id) REFERENCES "Users" (user_id),
        FOREIGN KEY(dorm_id) REFERENCES "Dorms" (dorm_id)
);

CREATE TABLE "Rooms" (
        room_id BIGSERIAL NOT NULL,
        floor_id BIGINT NOT NULL,
        block_number BIGINT NOT NULL,
        room_number BIGINT,
        PRIMARY KEY (room_id),
        FOREIGN KEY(floor_id) REFERENCES "Floors" (floor_id)
);

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
        deleted_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL,
        PRIMARY KEY (violation_id),
        FOREIGN KEY(user_id) REFERENCES "Users" (user_id),
        FOREIGN KEY(room_id) REFERENCES "Rooms" (room_id)
);


INSERT INTO "Dorms" (dorm_id, name, address) VALUES
(1, 'Горняк-2', 'просп. 60-летия Октября, 11, Москва'),
(2, 'Горняк-1', 'просп. 60-летия Октября, 13, Москва');

INSERT INTO "Users" (user_id, first_name, second_name, third_name, phone, tg, role, dorm_id, hashed_password) VALUES
(1, 'Ivan', 'Ivanov', 'Ivanovich', '78005553535', 'Ivanov_Ivan', 'soo_leader', 1, '$2b$12$.oyu3ThrDsJCXHe5VfIaS.kCS4wdNMOXsmW8.rn5GOIXkcdrAlcoC'),
(2, 'Petr', 'Petrov', 'Petrovich', '77777777777', 'Petrov_Petr', 'operative', 1, '$2b$12$.oyu3ThrDsJCXHe5VfIaS.kCS4wdNMOXsmW8.rn5GOIXkcdrAlcoC');

INSERT INTO "Floors" (floor_id, dorm_id, owner_id, floor_number, renovated_date) VALUES
(1, 1, 1, 8, '2023-01-01'),
(2, 2, 2, 1, '2023-01-01');

INSERT INTO "Rooms" (floor_id, block_number, room_number) VALUES
(1, 808, 3),
(1, 808, 2),
(1, 810, 2),
(1, 810, 3),
(1, 811, NULL);
