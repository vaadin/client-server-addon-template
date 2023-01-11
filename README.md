# Add-on template for Vaadin with an embedded Lit component 

![clock-element](https://user-images.githubusercontent.com/991105/184157011-9cdd51bb-2a57-4698-9fbb-e539d382e99f.png)

You should start from this project, if your add-on will be based on custom Lit HTML element (that you are not planning to publish through npm) and provide Java API for the rest of the application.
As an example this project implements a simple clock-element to display current time based on browser. 

## Add-on architecture
![client-server-addon](https://user-images.githubusercontent.com/991105/211867227-2c71ee29-9ea6-4de0-a5e4-2bf53781628d.svg)

### Alternative add-on templates

If you wish to build and publish an add-on or extension in [Vaadin Directory](https://vaadin.com/directory), Vaadin provides the following three template projects:
 1. [vaadin/addon-template](https://github.com/vaadin/addon-template): Create a composite component. This Java-only template is the easiest when extending Vaadin Java components.
 2. **(this repo)** [vaadin/client-server-addon-template](https://github.com/vaadin/client-server-addon-template): Build a standalone, client-server TypeScript-Java component. This template provides you with a [Lit-based](https://github.com/lit/lit/) example to start with.
 3. [vaadin/npm-addon-template](https://github.com/vaadin/npm-addon-template): Wrap a web component from [npmjs.com](https://npmjs.com/) as a Vaadin Java component.


## Development instructions

### Important Files 

Component implementation and API:
* Clock.java: Add-on component Java class. Provides server-side Java API to use component in your applications.
* clock-element.ts: TypeScript file that defines the client-side part of the component.
* clock-element.css: Default styles for the component.

For testing and development:
* TestView.java: A View class that let's you test the component you are building. This and other classes in the test folder will not be packaged during the build. You can add more test view classes in this package.
* TestViewIT.java: Integration tests for the component. Uses TestView.java.
* assembly/: this folder includes configuration for packaging the project into a JAR so that it works well with other Vaadin projects and the Vaadin Directory. There is usually no need to modify these files, unless you need to add JAR manifest entries.

### Deployment

Starting the test/demo server:
```
mvn jetty:run
```

This deploys test view at http://localhost:8099

### Integration test

To run Integration Tests, execute `mvn verify -Pit,production`.

## Publishing to Vaadin Directory

You should change the `organisation.name` property in `pom.xml` to your own name/organization.

```
    <organization>
        <name>###author###</name>
    </organization>
```

You can create the zip package needed for [Vaadin Directory](https://vaadin.com/directory/) using

```
mvn versions:set -DnewVersion=1.0.0 # You cannot publish snapshot versions 
mvn install -Pdirectory
```

The package is created as `target/{project-name}-1.0.0.zip`

For more information or to upload the package, visit https://vaadin.com/directory/my-components?uploadNewComponent
