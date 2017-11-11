import nock from 'nock';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import http from 'http';
import { createApp, createToken } from '../src/app';

const config = {
  facebook: {
    clientID: '128732717834556',
    clientSecret: 'XXX',
  },
  jwt: {
    secret: 'f444WXmFIVxxbo3MvQndRGZ5',
    expiration: 60 * 120, // in seconds
  },
};

const app = createApp(config);
const server = http.createServer(app);
// nock.recorder.rec();
chai.use(chaiHttp);

describe('Server', () => {
  describe('JWT Authentication', () => {
    it('returns a valid response if JWT token is present and valid', (done) => {
      const token = createToken({ id: 1001 }, config);

      chai.request(server)
        .get('/reports')
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('returns an authentication response error if JWT token is not present', (done) => {
      chai.request(server)
        .get('/reports')
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('returns an authentication response error if JWT token is expired', (done) => {
      const token = createToken({ id: 1001 }, {
        jwt: {
          secret: 'f444WXmFIVxxbo3MvQndRGZ5',
          expiration: 0, // in seconds
        },
      });

      chai.request(server)
        .get('/reports')
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });

  describe('Facebook Authentication', () => {
    // it('should return 401 status when not authenticated');

    before(() => {
      nock('https://graph.facebook.com:443', { encodedQueryParams: true })
        .get(/\/me$/)
        .query(queryObj => queryObj.access_token === 'valid_token')
        .reply(200, {
          id: '106458953461566', name: 'Margaret Wongberg', last_name: 'Wongberg', first_name: 'Margaret', email: 'margaret_zldursm_wongberg@tfbnw.net',
        });

      nock('https://graph.facebook.com:443', { encodedQueryParams: true })
        .get(/\/me$/)
        .query(queryObj => queryObj.access_token === 'invalid_token')
        .reply(400, {
          error: {
            message: 'Invalid OAuth access token.',
            type: 'OAuthException',
            code: 190,
            fbtrace_id: 'FdNcpt5NRHD',
          },
        });
    });

    it('should return a JWT token when facebook token is valid', (done) => {
      chai.request(server)
        .post('/auth/facebook')
        .send({ access_token: 'valid_token' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.have.header('x-auth-token');
          done();
        });
    });

    it('should return an error when token is invalid', (done) => {
      chai.request(server)
        .post('/auth/facebook')
        .send({ access_token: 'invalid_token' })
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });

  after(done => server.close(done));
});
