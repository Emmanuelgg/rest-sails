START TRANSACTION;
INSERT INTO `categories` (id, name, english, createdAt, updatedAt)
VALUES (1, "Comida", "Food", 0, 0),
(2, "Botana", "Snack", 0, 0),
(3, "Bebida", "Drink", 0, 0),
(4, "Postre", "Dessert", 0, 0)
;
INSERT INTO `units` (id, name, abbreviation, createdAt, updatedAt)
VALUES (1, "Kilogramo", "Kg", 0, 0),
(2, "Litro", "L", 0, 0),
(3, "Pieza", "Pz", 0, 0)
;
COMMIT;
