import nock from 'nock';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import http from 'http';
import createApp from '../src/app';

const config = {
  facebook: {
    clientID: '128732717834556',
    clientSecret: 'fada2088cc5fcf83788c16285d3a535c',
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
          done(err);
        });
    });

    it('should return an error when token is invalid', (done) => {
      chai.request(server)
        .post('/auth/facebook')
        .send({ access_token: 'invalid_token' })
        .end((err, res) => {
          expect(res).to.have.status(500);
          done(err);
        });
    });
  });

  after(done => server.close(done));
});
