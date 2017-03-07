# Instagram API

Browser and node module for making API requests against [Instagram API](https://api.instagram.com/{version}).

**Please note: This module uses [Popsicle](https://github.com/blakeembrey/popsicle) to make API requests. Promises must be supported or polyfilled on all target environments.**

## Installation

```
npm install instagram-api --save
bower install instagram-api --save
```

## Usage

### Node

```javascript
var InstagramApi = require('instagram-api');

var client = new InstagramApi();
```

### Browsers

```html
<script src="instagram-api/index.js"></script>

<script>
  var client = new InstagramApi();
</script>
```

### Options

You can set options when you initialize a client or at any time with the `options` property. You may also override options for a single request by passing an object as the second argument of any request method. For example:

```javascript
var client = new InstagramApi({ ... });

client.options = { ... };

client.resource('/').get(null, {
  baseUri: 'http://example.com',
  headers: {
    'Content-Type': 'application/json'
  }
});
```

#### Base URI

You can override the base URI by setting the `baseUri` property, or initializing a client with a base URI. For example:

```javascript
new InstagramApi({
  baseUri: 'https://example.com'
});
```

#### Base URI Parameters

If the base URI has parameters inline, you can set them by updating the `baseUriParameters` property. For example:

```javascript
client.options.baseUriParameters.version = 'v1';
```

### Resources

All methods return a HTTP request instance of [Popsicle](https://github.com/blakeembrey/popsicle), which allows the use of promises (and streaming in node).

#### resources.media.mediaId(mediaId)

* **mediaId** _integer_

```js
var resource = client.resources.media.mediaId(mediaId);
```

##### GET

Get information about a media object. The returned type key will allow you
to differentiate between image and video media.
Note: if you authenticate with an OAuth Token, you will receive the
user_has_liked key which quickly tells you whether the current user has liked
this media item.

```js
resource.get().then(function (res) { ... });
```

##### Query Parameters

```javascript
resource.get({ ... });
```

* **callback** _string_

Callback function name. All output will be wrapper under this function name.

* **count** _integer_

Number of items you would like to receive.

#### resources.media.mediaId(mediaId).comments

```js
var resource = client.resources.media.mediaId(mediaId).comments;
```

##### GET

Get a full list of comments on a media.

```js
resource.get().then(function (res) { ... });
```

##### Query Parameters

```javascript
resource.get({ ... });
```

* **callback** _string_

Callback function name. All output will be wrapper under this function name.

* **count** _integer_

Number of items you would like to receive.

##### POST

Create a comment on a media. Please email apidevelopers[at]instagram.com for access.

```js
resource.post().then(function (res) { ... });
```

##### Body

**application/x-www-form-urlencoded**

{
  "text": {
    "description": "Text to post as a comment on the media as specified in {mediaId}.",
    "type": "string",
    "required": true,
    "displayName": "text"
  }
}

#### resources.media.mediaId(mediaId).comments.commentId(commentId)

* **commentId** _integer_

Idenifier of the comment

```js
var resource = client.resources.media.mediaId(mediaId).comments.commentId(commentId);
```

##### DELETE

Remove a comment either on the authenticated user's media or authored by the authenticated user.

```js
resource.delete().then(function (res) { ... });
```

#### resources.media.mediaId(mediaId).likes

```js
var resource = client.resources.media.mediaId(mediaId).likes;
```

##### GET

Get a list of users who have liked this media.
Required scope: likes.

```js
resource.get().then(function (res) { ... });
```

##### Query Parameters

```javascript
resource.get({ ... });
```

* **callback** _string_

Callback function name. All output will be wrapper under this function name.

* **count** _integer_

Number of items you would like to receive.

##### POST

Set a like on this media by the currently authenticated user.

```js
resource.post().then(function (res) { ... });
```

##### DELETE

Remove a like on this media by the currently authenticated user.

```js
resource.delete().then(function (res) { ... });
```

#### resources.media.search

```js
var resource = client.resources.media.search;
```

##### GET

Search for media in a given area. The default time span is set to 5 days.
The time span must not exceed 7 days. Defaults time stamps cover the
last 5 days.

```js
resource.get().then(function (res) { ... });
```

##### Query Parameters

```javascript
resource.get({ ... });
```

* **max_timestamp** _integer_

Return media before this UNIX timestamp.

* **min_timestamp** _integer_

Return media after this UNIX timestamp.

* **callback** _string_

Callback function name. All output will be wrapper under this function name.

* **count** _integer_

Number of items you would like to receive.

* **lat** _number_

Latitude of the center search coordinate. If used, lng is required.

* **lng** _number_

Longitude of the center search coordinate. If used, lat is required.

* **distance** _string_

Default is 1km (distance=1000), max distance is 5km.

#### resources.media.popular

```js
var resource = client.resources.media.popular;
```

##### GET

Get a list of what media is most popular at the moment.

```js
resource.get().then(function (res) { ... });
```

##### Query Parameters

```javascript
resource.get({ ... });
```

* **callback** _string_

Callback function name. All output will be wrapper under this function name.

* **count** _integer_

Number of items you would like to receive.

#### resources.tags.tagName(tagName)

* **tagName** _string_

Name of tag.

```js
var resource = client.resources.tags.tagName(tagName);
```

##### GET

Get information about a tag object.

```js
resource.get().then(function (res) { ... });
```

##### Query Parameters

```javascript
resource.get({ ... });
```

* **callback** _string_

Callback function name. All output will be wrapper under this function name.

* **count** _integer_

Number of items you would like to receive.

#### resources.tags.tagName(tagName).media.recent

```js
var resource = client.resources.tags.tagName(tagName).media.recent;
```

##### GET

Get a list of recently tagged media. Note that this media is ordered by when the media was tagged
with this tag, rather than the order it was posted. Use the max_tag_id and min_tag_id parameters
in the pagination response to paginate through these objects.

```js
resource.get().then(function (res) { ... });
```

##### Query Parameters

```javascript
resource.get({ ... });
```

* **min_id** _integer_

Return media later than this min_id.

* **max_id** _integer_

Return media earlier than this max_id.

* **callback** _string_

Callback function name. All output will be wrapper under this function name.

* **count** _integer_

Number of items you would like to receive.

#### resources.tags.search

```js
var resource = client.resources.tags.search;
```

##### GET

Search for tags by name. Results are ordered first as an exact match, then by popularity.
Short tags will be treated as exact matches.

```js
resource.get().then(function (res) { ... });
```

##### Query Parameters

```javascript
resource.get({ ... });
```

* **callback** _string_

Callback function name. All output will be wrapper under this function name.

* **count** _integer_

Number of items you would like to receive.

* **q** _string_

A valid tag name without a leading #.

#### resources.users.userId(userId)

* **userId** _integer_

```js
var resource = client.resources.users.userId(userId);
```

##### GET

Get basic information about a user.

```js
resource.get().then(function (res) { ... });
```

##### Query Parameters

```javascript
resource.get({ ... });
```

* **callback** _string_

Callback function name. All output will be wrapper under this function name.

* **count** _integer_

Number of items you would like to receive.

#### resources.users.userId(userId).follows

```js
var resource = client.resources.users.userId(userId).follows;
```

##### GET

Get the list of users this user follows.

```js
resource.get().then(function (res) { ... });
```

##### Query Parameters

```javascript
resource.get({ ... });
```

* **callback** _string_

Callback function name. All output will be wrapper under this function name.

* **count** _integer_

Number of items you would like to receive.

#### resources.users.userId(userId).followed-by

```js
var resource = client.resources.users.userId(userId).followed-by;
```

##### GET

Get the list of users this user is followed by.

```js
resource.get().then(function (res) { ... });
```

##### Query Parameters

```javascript
resource.get({ ... });
```

* **callback** _string_

Callback function name. All output will be wrapper under this function name.

* **count** _integer_

Number of items you would like to receive.

#### resources.users.userId(userId).self.requested-by

```js
var resource = client.resources.users.userId(userId).self.requested-by;
```

##### GET

List the users who have requested this user's permission to follow.

```js
resource.get().then(function (res) { ... });
```

#### resources.users.userId(userId).media.recent

```js
var resource = client.resources.users.userId(userId).media.recent;
```

##### GET

See the authenticated user's feed. May return a mix of both image and
video types.

```js
resource.get().then(function (res) { ... });
```

##### Query Parameters

```javascript
resource.get({ ... });
```

* **max_timestamp** _integer_

Return media before this UNIX timestamp.

* **min_timestamp** _integer_

Return media after this UNIX timestamp.

* **min_id** _integer_

Return media later than this min_id.

* **max_id** _integer_

Return media earlier than this max_id.

* **callback** _string_

Callback function name. All output will be wrapper under this function name.

* **count** _integer_

Number of items you would like to receive.

#### resources.users.userId(userId).relationship

```js
var resource = client.resources.users.userId(userId).relationship;
```

##### GET

Get information about a relationship to another user.

```js
resource.get().then(function (res) { ... });
```

##### Query Parameters

```javascript
resource.get({ ... });
```

* **callback** _string_

Callback function name. All output will be wrapper under this function name.

* **count** _integer_

Number of items you would like to receive.

##### POST

Modify the relationship between the current user and the target user.

```js
resource.post().then(function (res) { ... });
```

##### Body

**application/json**

{
  "action": {
    "description": "One of follow/unfollow/block/unblock/approve/deny.",
    "enum": [
      "follow",
      "unfollow",
      "block",
      "unblock",
      "approve",
      "deny"
    ],
    "displayName": "action",
    "type": "string"
  }
}

#### resources.users.search

```js
var resource = client.resources.users.search;
```

##### GET

Search for a user by name.

```js
resource.get().then(function (res) { ... });
```

##### Query Parameters

```javascript
resource.get({ ... });
```

* **callback** _string_

Callback function name. All output will be wrapper under this function name.

* **count** _integer_

Number of users to return.

* **q** _string_

A query string.

#### resources.users.self.feed

```js
var resource = client.resources.users.self.feed;
```

##### GET

See the authenticated user's feed. May return a mix of both image and
video types.

```js
resource.get().then(function (res) { ... });
```

##### Query Parameters

```javascript
resource.get({ ... });
```

* **min_id** _integer_

Return media later than this min_id.

* **max_id** _integer_

Return media earlier than this max_id.

* **callback** _string_

Callback function name. All output will be wrapper under this function name.

* **count** _integer_

Number of items you would like to receive.

#### resources.users.self.media.liked

```js
var resource = client.resources.users.self.media.liked;
```

##### GET

See the authenticated user's list of media they've liked. May return a mix
of both image and video types.
Note: This list is ordered by the order in which the user liked the media.
Private media is returned as long as the authenticated user has permission
to view that media. Liked media lists are only available for the currently
authenticated user.

```js
resource.get().then(function (res) { ... });
```

##### Query Parameters

```javascript
resource.get({ ... });
```

* **callback** _string_

Callback function name. All output will be wrapper under this function name.

* **count** _integer_

Number of items you would like to receive.

* **max_like_id** _integer_

Return media liked before this id.

#### resources.oembed

```js
var resource = client.resources.oembed;
```

##### GET

Given a short link, returns information about the media associated with
that link.

```js
resource.get().then(function (res) { ... });
```

##### Query Parameters

```javascript
resource.get({ ... });
```

* **callback** _string_

Callback function name. All output will be wrapper under this function name.

* **count** _integer_

Number of items you would like to receive.

* **url** _string_

* **maxheight** _integer_

* **maxwidth** _integer_

#### resources.p.shortcode(shortcode).media

```js
var resource = client.resources.p.shortcode(shortcode).media;
```

##### GET

Given a short link, issues a redirect to that media's JPG file.

```js
resource.get().then(function (res) { ... });
```

##### Query Parameters

```javascript
resource.get({ ... });
```

* **callback** _string_

Callback function name. All output will be wrapper under this function name.

* **count** _integer_

Number of items you would like to receive.

* **size** _string, one of (t,, m,, l), default: m_

#### resources.locations.locId(locId)

* **locId** _integer_

```js
var resource = client.resources.locations.locId(locId);
```

##### GET

Get information about a location.

```js
resource.get().then(function (res) { ... });
```

#### resources.locations.locId(locId).media.recent

```js
var resource = client.resources.locations.locId(locId).media.recent;
```

##### GET

Get a list of recent media objects from a given location. May return a
mix of both image and video types.

```js
resource.get().then(function (res) { ... });
```

##### Query Parameters

```javascript
resource.get({ ... });
```

* **max_timestamp** _integer_

Return media before this UNIX timestamp.

* **min_timestamp** _integer_

Return media after this UNIX timestamp.

* **min_id** _integer_

Return media later than this min_id.

* **max_id** _integer_

Return media earlier than this max_id.

* **callback** _string_

Callback function name. All output will be wrapper under this function name.

* **count** _integer_

Number of items you would like to receive.

#### resources.locations.search

```js
var resource = client.resources.locations.search;
```

##### GET

Search for a location by geographic coordinate.

```js
resource.get().then(function (res) { ... });
```

##### Query Parameters

```javascript
resource.get({ ... });
```

* **callback** _string_

Callback function name. All output will be wrapper under this function name.

* **count** _integer_

Number of items you would like to receive.

* **lat** _number_

Latitude of the center search coordinate. If used, lng is required.

* **lng** _number_

Longitude of the center search coordinate. If used, lat is required.

* **distance** _integer, default: 1000_

Default is 1000m (distance=1000), max distance is 5000.

* **foursquare_v2_id** _string_

Returns a location mapped off of a foursquare v2 api location id. If
used, you are not required to use lat and lng.

* **foursquare_id** _string_

Returns a location mapped off of a foursquare v1 api location id. If used,
you are not required to use lat and lng. Note that this method is deprecated;
you should use the new foursquare IDs with V2 of their API.

#### resources.geographies.geoId(geoId).media.recent

```js
var resource = client.resources.geographies.geoId(geoId).media.recent;
```

##### GET

Get recent media from a geography subscription that you created.
Note: You can only access Geographies that were explicitly created by your
OAuth client. Check the Geography Subscriptions section of the real-time
updates page. When you create a subscription to some geography that you
define, you will be returned a unique geo-id that can be used in this
query. To backfill photos from the location covered by this geography,
use the media search endpoint.

```js
resource.get().then(function (res) { ... });
```

##### Query Parameters

```javascript
resource.get({ ... });
```

* **callback** _string_

Callback function name. All output will be wrapper under this function name.

* **count** _integer_

Number of items you would like to receive.

* **min_id** _integer_

Return media before this min_id.



### Custom Resources

You can make requests to a custom path in the API using the `#resource(path)` method.

```javascript
client.resource('/example/path').get();
```

## License

Apache 2.0
