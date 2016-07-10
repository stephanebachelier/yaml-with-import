import should from 'should';

import YamlWithImport from '../src/yaml-with-import';

describe('express yaml config loader', () => {
    const yaml = new YamlWithImport();

    before((done) => {
        done();
    });

    after((done) => {
        done();
    });

    it('yaml read with one import statement', (done) => {
        const json = yaml.read(`${__dirname}/fixtures/test.yml`);
        json.should.have.keys('database', 'woohoo');
        json.database.should.have.keys('connection_string');
        json.database.connection_string.should.be.eql('localhost');
        done();
    });


    it('yaml read with nested import', (done) => {
        const json = yaml.read(`${__dirname}/fixtures/nested.yml`);
        json.should.have.keys('database', 'woohoo');
        json.database.should.have.keys('connection_string');
        json.woohoo.should.have.keys('type');
        json.database.connection_string.should.be.eql('localhost');
        json.woohoo.type.should.be.eql('nested_1');

        done();
    });


    it('yaml read with multiple import in one file expects multiple file to merge', (done) => {
        const json = yaml.read(`${__dirname}/fixtures/multiple.yml`);
        json.should.have.keys(
            'asddsa',
            'more_stuff',
            'route',
            'something_worked',
            'template_engine',
            'test'
        );
        json.asddsa.ffff.should.be.eql('assss');
        json.test.should.be.eql(11111);
        json.template_engine.engine.should.be.eql('hbs');
        json.template_engine.layout.should.be.eql('src/view/layouts');
        json.route.blogs.path.should.be.eql('/');
        json.route.blogs.defaults.controller.should.be.eql('Blog:index');
        json.route.blogs.methods.length.should.be.eql(2);
        json.route.blogs.methods[0].should.be.eql('post');
        json.route.blogs.methods[1].should.be.eql('put');
        json.more_stuff.should.be.eql('awww yeah override');
        json.something_worked.should.be.eql('woohoo');


        done();
    });

    // test no import
    it('yaml read with no import expects no external recursive read or read', (done) => {
        const json = yaml.read(`${__dirname}/fixtures/test5.yml`);
        json.something_worked.should.be.eql('woohoo');
        json.more_stuff.should.be.eql('awww yeah override');
        done();
    });

    // test empty import
    it('yaml read with with non existing file expects exception thrown', (done) => {
        try {
            yaml.read(`${__dirname}/fixtures/empty.yml`);
            done();
        } catch(err) {
            should.exist(err);
        }
    });
});
