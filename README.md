เริ่มจากฝั่ง เซิฟเวอร์

เรามีไฟล์ app.js ทำหน้าที่ 
เชื่อมต่อ กับ express, ผ่าน port และมี middleware สำหรับ cors และ json
เชือมต่อ กับ mongoose, ผ่าน db
เชื่อมต่อ กับ graphql, ผ่าน schema 

โฟลเดอร์ models ซึ่งมี author.js และ book.js
ทั้งสองไฟล์ ใช้กำหนดรูปแบบการติดต่อกับ mongodb

ไฟล์ schema ใช้สำหรับ รองรับการติดต่อจาก client
การสร้างรูปแบบการคิวรี่ data เช่น book (id), books, author (id), authors
การสร้างรูปแบบแก้ไขข้อมูล เช่น addAuthor และ addBook
การติดต่อข้อมูลผ่าน graphql ส่วนการทำสอบทำผ่าน localhost:5000/graphql

====================================
จากฝั่ง ไคลเอ็น

ใน queries
จะมีการวางคำสั่งการเรียกใช้ graphql ล่วงหน้า ไว้เราไปใช้ได้แก่ 
getBooks, getBook, getAuthors, addBook

เรามี App.js เป็น component หลักเชื่อมต่อกับ client ที่สร้างจาก apollo 
เรามี Component ย่อย ได้แก่ BookList และ addBook

โดย BookList ( ใช้ getBooks )
จะมี <ul> ซึ่งภายในมี ฟังก์ชัน displayBooks 
ซึ่งเรียกใช้ getBooks ไว้สำหรับ คิวรี่ books ในเซิฟเวอร์ 
โดยค่าที่ได้กลับมาใน books มี id,title,genre,authorId
แต่เราจะเก็บเฉพาะ id ไว้ใน state.selected ของ component 
โดยการจัดเก็บจะทำเมื่อมีการ click บน <li>{book.title}</li>
จะเห็นว่าเราแสดงผลเฉพาะ title ของ book เท่านั้น
ส่วนการเชื่อมต่อ กับ component BookList 
็มีการส่งค่าผ่านค่าจาก state.selected โดยกำหนดชื่อใหม่ว่า bookId
แต่ต้องจำไว้ว่าเป็น bookId ของอันที่เรา click เท่านั้น

ใน BookDetail (ใช้ getBook)
เรียกใช้ getBook ซึ่งรับค่า bookId มาจาก BookList ที่ผ่านมา 
โดยเราจะได้รับค่ามาเป็น book ในนี้ก็มี id, title, genre, author.name
ส่วนการแสดงผล ภายใน <div> มีการเรียกใช้คำสั่ง displayBookDetail
ซึ่งจะแสดงค่า id,title,genre,author.name ออกมา 

ใน AddBook (ใช้ getAuthors และ addBook)
เริ่มต้นด้วยการ getAuthors ซึ่งจะเรียกใช้ คิวรี่ authors 
จะได้ข้อมูล author มาใช้ใน <select>
โดยค่า value จะเป็น author.id ส่วนแสดงผลเป็น author.name
โดยเมื่อทำการ change ส่งค่า author.id ไปเก็บใน state เป็นอันแรก
ส่วนค่า อื่นๆ ใน <input> ก็จะเก็ยค่า title, genre ใน state เมื่อ change
ส่วนใน <form> เมื่อ กด submit ก็จะ เรียกมิวเทชัน addBook ของ graphql
จะเอาค่าต่างใน state ส่งไปให้ server แล้วทำการ เรียกใช้ คิวรี่ getBooks 
อีกครั้งเพื่อ refresh หน้าจอ
