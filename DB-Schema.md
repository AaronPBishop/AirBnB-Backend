## Copy to DBDiagram to view schema

Table users {
  id int [pk, increment]
  firstName string
  lastName string
  email varchar
  phone integer
  username varchar
}

Table spots {
  id int [pk, increment]
  ownerId int
  address varchar
  city string
  state string
  country string
  lat decimal
  lng decimal
  name varchar
  description varchar
  price decimal(5, 2)
}

Table reviews {
  id int [pk, increment]
  userId int
  spotId int
  review varchar
  stars integer
}

Table bookings {
  id int [pk, increment]
  spotId int
  userId int
  startDate date
  endDate date
}

Table images {
  id int [pk, increment]
  userId int
  spotId int
  reviewId int
  preview boolean
  url varchar
}


Ref: "bookings"."userId" < "users"."id"

Ref: "reviews"."userId" < "users"."id"

Ref: "spots"."ownerId" < "users"."id"

Ref: "reviews"."spotId" < "spots"."id"

Ref: "bookings"."spotId" < "spots"."id"

Ref: "images"."spotId" < "spots"."id"

Ref: "images"."reviewId" < "reviews"."id"

Ref: "images"."userId" < "users"."id"