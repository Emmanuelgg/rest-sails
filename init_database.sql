START TRANSACTION;
INSERT INTO `categories` (id, name, english, createdAt, updatedAt)
VALUES (1, "Comida", "Food", 1, 1),
(2, "Botana", "Snack", 1, 1),
(3, "Bebida", "Drink", 1, 1),
(4, "Postre", "Dessert", 1, 1)
;
INSERT INTO `units` (id, name, abbreviation, createdAt, updatedAt)
VALUES (1, "Kilogramo", "Kg", 1, 1),
(2, "Litro", "L", 1, 1),
(3, "Pieza", "Pz", 1, 1)
;
COMMIT;
