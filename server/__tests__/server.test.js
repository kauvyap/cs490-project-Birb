import request from 'supertest';
import app from '../server';

describe('Test API Endpoints', () => {
    it('GET /api/user/ get err 400 when user not found ', async () => {
        const response = await request(app).get('/api/user/notAUser')
       // console.log(response)
        expect(response.status).toEqual(400)
    });

    it('POST /api/auth/register Create a new user', async () => {
        const userData = {
            username: "newuser@gmail.com", 
            password: "hashpassword", 
            fname: "fname", 
            lname: "lname", 
            pomodoro: {timer: 25, short: 5, long: 15},
        }
        const response = await request(app).post('/api/auth/register').send(userData).set('Content-Type', 'application/json');;
        //console.log(response)
        expect(response.status).toEqual(200)
        expect(response.text).toEqual("user created")
    });

    it('POST /api/auth/register Create a user with a used email', async () => {
        const userData = {
            username: "newuser@gmail.com", 
            password: "hashpassword", 
            fname: "fname", 
            lname: "lname", 
            pomodoro: {timer: 25, short: 5, long: 15},
        }
        const response = await request(app).post('/api/auth/register').send(userData).set('Content-Type', 'application/json');
       // console.log(response)
        expect(response.status).toEqual(400)
        expect(response.text).toEqual("{\"error\":\"Username already exists\"}")
    });

    it('GET /api/user/ get response 200 and appropriate content-type', async () => {
        const response = await request(app).get('/api/user/newuser@gmail.com')
       // console.log(response)
        expect(response.status).toEqual(200)
    });



    it('PUT /api/user/ Update user fname and lname', async () => {
        const userData = {
            id: "guivilatoro@gmail.com", 
            username: "guivilatoro@gmail.com",
            fname: "Guilherme", 
            lname: "Vilatoro", 
            pomodoro: {timer: 5, short: 2, long: 3},
        }
        const response = await request(app).put('/api/user/guivilatoro@gmail.com').send(userData).set('Content-Type', 'application/json');
        //console.log(response)
        expect(response.status).toEqual(200)
        expect(response.body.fname).toEqual("Guilherme");
        expect(response.body.lname).toEqual("Vilatoro");
    });

    it('POST /api/auth/login Testing login', async () => {
        const userData = {
            username: "newuser@gmail.com", 
            password: "hashpassword", 
        }
        const response = await request(app).post('/api/auth/login').send(userData).set('Content-Type', 'application/json');;
        //console.log(response)
        expect(response.status).toEqual(200)
        expect(response._body.token);

    });

    it('POST /api/auth/login Testing login with user but wrong password', async () => {
        const userData = {
            username: "newuser@gmail.com", 
            password: "hash", 
        }
        const response = await request(app).post('/api/auth/login').send(userData).set('Content-Type', 'application/json');;
        //console.log(response)
        expect(response.status).toEqual(400)
        expect(response._body.error).toEqual("Invalid Password");
    });


    
    it('POST /api/auth/login Testing login with wrong user and password', async () => {
        const userData = {
            username: "newuser@", 
            password: "hash", 
        }
        const response = await request(app).post('/api/auth/login').send(userData).set('Content-Type', 'application/json');;
        //console.log(response)
        expect(response.status).toEqual(404)
        expect(response._body.error).toEqual("Username does not exist");
    });
//---------------------------------------------------------------------
    it('DELETE /api/user/ get response 200 and delete newuser@gmail.com from DB', async () => {
        const response = await request(app).delete('/api/user/newuser@gmail.com')
       // console.log(response)
        expect(response.status).toEqual(200)
    });

    it('GET /api/user/ testing if newuser@gmail.com was deleted', async () => {
        const response = await request(app).get('/api/user/newuser@gmail.com')
        //console.log(response)
        expect(response.status).toEqual(400)
    });

 });