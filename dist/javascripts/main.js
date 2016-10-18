(function() {
  var ips = new IPS();

  var vent = _.extend({}, Backbone.Events);
  /**
   * Dynamic Example from Form
   */
  var FormModel = Backbone.Model.extend({
    defaults: {
      auto_update: false,
      service:    "placeholdit",
      height:     100,
      width:      100,
      filter:     "",
      foreground: "",
      background: "",
      format:     "",
      text:       "",
      category:   "",
      delay:      0,
      brand:      "",
      flag:       "",
      textture:   ""
    }
  });

  var FormView = Backbone.View.extend({
    initialize: function() {
      this.$inputs = this.$('input, select').not('[name="auto_update"]');
      this.$dependentFields = this.$('[data-requires]');
      this.$srcText = this.$('#formImageSrc');

      this.handleSubmit();
    },

    events: {
      'click button[type="submit"]':      'handleSubmit',
      'change select[name="service"]':    'handleServiceChange',
      'change input,select':              'handleInputChange',
      'change input[name="auto_update"]': 'toggleAutoUpdate'
    },

    handleServiceChange: function(evt) {
      var $target = $(evt.target);
      var service = $target.val();

      this.$dependentFields
        .fadeOut()
        .filter('[data-requires^="service:' + service + '"]')
          .fadeIn();
    },

    handleSubmit: function(evt) {
      var _this = this;
      !!evt && evt.preventDefault();
      this.$inputs.each(function() {
        var name = $(this).attr('name');
        var value = $(this).val();
        // console.log(name + ': ' + value);
        if ( $(this).val() !== "" || (name !== 'height' && name !== 'width')) {
          _this.model.set(name, value)
        }
      });
      console.log(this.model.attributes);
      vent.trigger('image:update', this.model.attributes);
    },

    handleInputChange: _.debounce(function(evt) {
      if (this.model.get('auto_update')) {
        this.handleSubmit();
      }
    }, 400),

    toggleAutoUpdate: function(evt) {
      var $target = $(evt.target);
      var checked = $target.is(':checked');
      this.model.set('auto_update', checked);
    }
  });

  var FormImageView = Backbone.View.extend({
    initialize: function() {
      this.$image = this.$('img');
      this.$src = this.$('.ImageResult-source code');
      this.listenTo(vent, 'image:update', this.update);
    },
    update: function(imageData) {
      var _this = this;
      var service = imageData.service || null;
      var newData = {};
      _.each(imageData, function(value,key) {
        if (value !== "") {
          newData[key] = value;
        }
      });
      var src = ips.src(_.omit(newData, 'service'), service);
      this.$src.text(src);
      this.$image
        .addClass('loading')
        .attr('src', 'images/loading.gif');
      // console.log(src);

      var img = $("<img />").attr('src', src)
        .on('load', function() {
          _this.$image.attr('src', src)
            .removeClass('loading');
        });
    }
  });

  // Initialize Views
  var ImageResult = new FormImageView({ el: $('#ImageResult')});
  var form = new FormView({
    model: new FormModel(),
    el: $('#form')
  });

  /**
   * Examples
   */
  var imageData = {
    height: 300,
    width: 300
  };
  var srcsetData = [
    {
      height: 400,
      width: 400
    },
    {
      height: 1000,
      width: 1000
    }
  ];

  // Default Source
  src = ips.src(imageData);
  var img1 = document.getElementById("img1");
  console.log(src);
  img1.setAttribute('src', src);

  // Default Srcset
  srcset = ips.srcset(srcsetData);
  var img2 = document.getElementById("img2");
  console.log(srcset);
  img2.setAttribute('src', src);
  img2.setAttribute('srcset', srcset);

  // Lorempixel Source
  src = ips.src(imageData, 'lorempixel');
  var img3 = document.getElementById("img3");
  console.log(src);
  img3.setAttribute('src', src);

  // Lorempixel Srcset
  srcset = ips.srcset(srcsetData, 'lorempixel');
  var img4 = document.getElementById("img4");
  console.log(srcset);
  img4.setAttribute('src', src);
  img4.setAttribute('srcset', srcset);

  // Fillmurray Source
  src = ips.src(imageData, 'fillmurray');
  var img5 = document.getElementById("img5");
  console.log(src);
  img5.setAttribute('src', src);

  // Fillmurray Srcset
  srcset = ips.srcset(srcsetData, 'fillmurray');
  var img6 = document.getElementById("img6");
  console.log(srcset);
  img6.setAttribute('src', src);
  img6.setAttribute('srcset', srcset);

  // Placecage Source
  src = ips.src(imageData, 'placecage');
  var img7 = document.getElementById("img7");
  console.log(src);
  img7.setAttribute('src', src);

  // Placecage Srcset
  srcset = ips.srcset(srcsetData, 'placecage');
  var img8 = document.getElementById("img8");
  console.log(srcset);
  img8.setAttribute('src', src);
  img8.setAttribute('srcset', srcset);

  // Placeimg Source
  src = ips.src(imageData, 'placeimg');
  var img9 = document.getElementById("img9");
  console.log(src);
  img9.setAttribute('src', src);

  // Placeimg Srcset
  srcset = ips.srcset(srcsetData, 'placeimg');
  var img10 = document.getElementById("img10");
  console.log(srcset);
  img10.setAttribute('src', src);
  img10.setAttribute('srcset', srcset);

  // Satyr Source
  src = ips.src(imageData, 'satyr');
  var img11 = document.getElementById("img11");
  console.log(src);
  img11.setAttribute('src', src);

  // Satyr Srcset
  srcset = ips.srcset(srcsetData, 'satyr');
  var img12 = document.getElementById("img12");
  console.log(srcset);
  img12.setAttribute('src', src);
  img12.setAttribute('srcset', srcset);

  // Register a new placeholder service
  ips.register({
    name: 'placekitten',
    render: function(args) {
      return (typeof(args.protocol) !== 'undefined' ? args.protocol : "")
        + '//placekitten.com'
        + (typeof(args.filter) !== 'undefined' ? '/'+args.filter : "")
        + '/' + args.width + '/' + args.width;
    },
    modifier: function(data) {
      return data;
    }
  });
  // Custom Source Placekitten
  src = ips.src(imageData, 'placekitten');
  var img13 = document.getElementById("img13");
  console.log(src);
  img13.setAttribute('src', src);

  // Custom Srcset Placekitten
  srcset = ips.srcset(srcsetData, 'placekitten');
  var img14 = document.getElementById("img14");
  console.log(srcset);
  img14.setAttribute('src', src);
  img14.setAttribute('srcset', srcset);

  // Unique Image
  var data = [
    {
      height: 400,
      width: 400
      // , format: 'gif'
      // , filter: 'crazy'
    },
    {
      height: 400,
      width: 400
      // , format: 'gif'
      // , filter: 'crazy'
    },
    {
      height: 400,
      width: 400
      // , format: 'gif'
      // , filter: 'crazy'
    }
  ];
  var serviceNames = [
    'placecage',
    'lorempixel',
    'placeimg',
    'fillmurray'
  ];

  // Examples service is randomize on each page load.
  var randomNumber = Math.floor(Math.random() * serviceNames.length-1) + 1
  for (var i = 1; i < 5; i++) {
    var uniqueImage = document.getElementById("sameImage" + i);
    srcset = ips.srcset(data, serviceNames[randomNumber]);
    uniqueImage.setAttribute('srcset', srcset);
  }
  for (var i = 1; i < 5; i++) {
    var uniqueImage = document.getElementById("uniqueImage" + i);
    srcset = ips.srcset(data, serviceNames[randomNumber], {unique:i});
    uniqueImage.setAttribute('srcset', srcset);
  }

  // Service Override
  // create new IPS instance
  var ipsOverride = new IPS({
    serviceOverride: 'placeholdit'
  });
  for (var i = 1; i < 5; i++) {
    var overrideImage = document.getElementById("override" + i);
    srcset = ipsOverride.srcset(data, serviceNames[(i-1)]);
    overrideImage.setAttribute('srcset', srcset);
  }
})();
