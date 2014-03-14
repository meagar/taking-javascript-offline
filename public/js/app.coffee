window.App =
  Models : { }
  Collections: { }
  Views: { }

class App.Router extends Backbone.Router
  routes:
    '': 'index'
    'posts/new': 'newPost'
    'posts/:id': 'editPost'
  initialize: ->
    @collection = new App.Collections.Posts()
    @collection.fetch()

  _show: (view) ->
    @_view?.remove()
    @_view = view
    $('#content').append(@_view.render().el)

  index: ->
    console.log "Router#index"
    @_show(new App.Views.Index(collection: @collection))

  newPost: ->
    console.log "Router#newPost"
    model = new App.Models.Post
    @_show(new App.Views.PostForm(collection: @collection, model: model))

  editPost: (id) ->
    console.log "Router#editPost"
    model = @collection.get(id)
    @_show(new App.Views.PostForm(collection: @collection, model: model))

#
# Views
#


class App.Views.View extends Backbone.View
  @_templateCache = {}

  constructor: ->
    super
    @setTemplate(@templateName) if @templateName

  setTemplate: (template) ->
    @template = @loadTemplate(template)

  loadTemplate: (template) ->
    if t = App.Views.View._templateCache[template]
      return t

    $el = $("#tmpl-#{template}")
    throw Error("Template not found: tmpl-#{template}") unless $el.length == 1
    App.Views.View._templateCache[template] = Handlebars.compile $el.html()

  render: (data = @model.toJSON()) ->
    @$el.html(@template(data))
    @

class App.Views.Index extends App.Views.View
  templateName: 'index'

  initialize: ->
    @listenTo @collection, 'sync', @render

    $(window).bind 'online, offline', => @render()

  render: ->
    @$el.html(@template(online: navigator.onLine))

    @$('ul#posts').html(
      for post in @collection.models
        new App.Views.Post(model: post).render().el
    )
    @


class App.Views.Post extends App.Views.View
  tagName: 'li'
  templateName: 'post'
  className: 'post'

  events:
    'click a.delete': 'clickDelete'

  initialize: ->
    @listenTo @model, 'remove', @remove
    @listenTo @model, 'sync', @render

  clickDelete: (e) ->
    e.preventDefault()
    @model.destroy() if confirm("Are you sure?")

  render: ->
    data = @model.toJSON()
    data.last_updated = moment(parseInt(data.updated_at,10)).fromNow()
    super(data)

class App.Views.PostForm extends App.Views.View
  templateName: 'post-form'

  events:
    'submit form': 'save'

  save: (e) ->
    e.preventDefault()

    @model.set
      title: @$('#title').val()
      about: @$('#about').val()
    @collection.create(@model)

    App.router.navigate('#', trigger: true)

#
# Data
#

class App.Models.Post extends Backbone.Model
  idAttribute: '_id'
  url: ->
    if @id then "/api/posts/#{@id}" else "/api/posts"

class App.Collections.Posts extends Backbone.Collection
  model: App.Models.Post
  url: '/api/posts'

$ ->
  App.router = new App.Router()
  Backbone.history.start()
