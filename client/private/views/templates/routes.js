Router.route('/templates', {
  name: 'media.templates',
  controller: 'PrivateController',
  action: function () {
    Session.set("route", "Templates");
    uiInfo(true);

    this.render('templates');
  },
  onStop: function () {
    uiInfo(false);
  }
});

Router.route('/templates/:deviceId', {
  controller: 'PrivateController',
  action: function () {
    if (this.ready()) {
      let template = Templates.findOne({ "_id": this.params.deviceId });
      Session.set("route", "Template / Edit");

      Session.set("template-edit", template);

      this.render("templateEdit");
    }
    uiInfo(false);
  },
  onStop: function () {
    uiInfo(true);
  }
});

Router.route('/templates/:templateId/preview', {
  template: "emptyBase",
  waitOn: function () {
    return [
      Meteor.subscribe("templates"),
    ];
  },
  action: function () {
    if (this.ready()) {
      let template = Templates.findOne({ "_id": this.params.templateId });
      Session.set("template-edit", template);

      this.render("templatePreview");
    }
    uiInfo(false);
  },
  onStop: function () {
    uiInfo(true);
  }
});

Router.route('/styles', {
  name: 'media.styles',
  controller: 'PrivateController',
  action: function () {
    Session.set("route", "Templates");
    uiInfo(true);

    this.render('templateStyles');
  },
  onStop: function () {
    uiInfo(false);
  }
});