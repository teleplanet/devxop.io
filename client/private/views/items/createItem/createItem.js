

Template.createItem.helpers({
  'getCopy': function () {


    return Session.get("item-creation");
  },
  'getCopyTags': function () {
    var data = Session.get("item-creation");

    data.tags = Session.get("tags");
    data.description = Session.get("editor-text");

    //console.log(data.description.rmStopWords());

    Session.set("item-creation", data);

    return Session.get("item-creation").tags;
  }
});

Template.createItem.events({
  'click .js-create-item': function (event, template) {
    event.preventDefault();

    var data = {
      'name': Session.get("item-creation").title,
      'price': $('#input-price').val(),
      'kcal': $('#input-kcal').val(),
      'info_en': $('#input-info-en').val(),
      'info_es': $('#input-info-es').val(),
      'info_pt': $('#input-info-pt').val(),
      'category': Session.get("module.selectedCategory")["_id"],
      'image': Session.get("module.imageUpload"),
      'image_thumb': Session.get("module.imageUploadThumb"),
      'visible': true
    }


    Meteor.call("items.insert", data, function (err, data) {
      if (err) {
        console.log(err)
        notifyMessage("An error occurred creating item.", "danger");
      } else {
        Router.go("/")
        notifyMessage("New item created!", "success");
      }

    });

    return;

  }
});


Template.createItemCheck.events({
  'submit .js-form-item-create-check': function (event, template) {
    event.preventDefault();

    var title = template.find("#item-create-check-input").value;

    Router.go("/item/create/validate/" + title);
  }
});



function getDictionary() {
  return [
    "a", "about", "above", "across", "after", "again", "against", "all", "almost", "alone", "along", "already", "also", "although",
    "always", "among", "an", "and", "another", "any", "anybody", "anyone", "anything", "anywhere", "are", "area", "areas", "around",
    "as", "ask", "asked", "asking", "asks", "at", "away", "b", "back", "backed", "backing", "backs", "be", "became", "because", "become",
    "becomes", "been", "before", "began", "behind", "being", "beings", "best", "better", "between", "big", "both", "but", "by", "c", "came",
    "can", "cannot", "case", "cases", "certain", "certainly", "clear", "clearly", "come", "could", "d", "did", "differ", "different", "differently",
    "do", "does", "done", "down", "down", "downed", "downing", "downs", "during", "e", "each", "early", "either", "end", "ended", "ending", "ends",
    "enough", "even", "evenly", "ever", "every", "everybody", "everyone", "everything", "everywhere", "f", "face", "faces", "fact", "facts",
    "far", "felt", "few", "find",
    "finds",
    "first",
    "for",
    "four",
    "from",
    "full",
    "fully",
    "further",
    "furthered",
    "furthering",
    "furthers",
    "g",
    "gave",
    "general",
    "generally",
    "get",
    "gets",
    "give",
    "given",
    "gives",
    "go",
    "going",
    "good",
    "goods",
    "got",
    "great",
    "greater",
    "greatest",
    "group",
    "grouped",
    "grouping",
    "groups",
    "h",
    "had",
    "has",
    "have",
    "having",
    "he",
    "her",
    "here",
    "herself",
    "high",
    "high",
    "high",
    "higher",
    "highest",
    "him",
    "himself",
    "his",
    "how",
    "however",
    "i",
    "if",
    "important",
    "in",
    "interest",
    "interested",
    "interesting",
    "interests",
    "into",
    "is",
    "it",
    "its",
    "itself",
    "j",
    "just",
    "k",
    "keep",
    "keeps",
    "kind",
    "knew",
    "know",
    "known",
    "knows",
    "l",
    "large",
    "largely",
    "last",
    "later",
    "latest",
    "least",
    "less",
    "let",
    "lets",
    "like",
    "likely",
    "long",
    "longer",
    "longest",
    "m",
    "made",
    "make",
    "making",
    "man",
    "many",
    "may",
    "me",
    "member",
    "members",
    "men",
    "might",
    "more",
    "most",
    "mostly",
    "mr",
    "mrs",
    "much",
    "must",
    "my",
    "myself",
    "n",
    "necessary",
    "need",
    "needed",
    "needing",
    "needs",
    "never",
    "new",
    "new",
    "newer",
    "newest",
    "next",
    "no",
    "nobody",
    "non",
    "noone",
    "not",
    "nothing",
    "now",
    "nowhere",
    "number",
    "numbers",
    "o",
    "of",
    "off",
    "often",
    "old",
    "older",
    "oldest",
    "on",
    "once",
    "one",
    "only",
    "open",
    "opened",
    "opening",
    "opens",
    "or",
    "order",
    "ordered",
    "ordering",
    "orders",
    "other",
    "others",
    "our",
    "out",
    "over",
    "p",
    "part",
    "parted",
    "parting",
    "parts",
    "per",
    "perhaps",
    "place",
    "places",
    "point",
    "pointed",
    "pointing",
    "points",
    "possible",
    "present",
    "presented",
    "presenting",
    "presents",
    "problem",
    "problems",
    "put",
    "puts",
    "q",
    "quite",
    "r",
    "rather",
    "really",
    "right",
    "right",
    "room",
    "rooms",
    "s",
    "said",
    "same",
    "saw",
    "say",
    "says",
    "second",
    "seconds",
    "see",
    "seem",
    "seemed",
    "seeming",
    "seems",
    "sees",
    "several",
    "shall",
    "she",
    "should",
    "show",
    "showed",
    "showing",
    "shows",
    "side",
    "sides",
    "since",
    "small",
    "smaller",
    "smallest",
    "so",
    "some",
    "somebody",
    "someone",
    "something",
    "somewhere",
    "state",
    "states",
    "still",
    "till",
    "such",
    "sure",
    "t",
    "take",
    "taken",
    "than",
    "that",
    "the",
    "their",
    "them",
    "then",
    "there",
    "therefore",
    "these",
    "they",
    "thing",
    "things",
    "think",
    "thinks",
    "this",
    "those",
    "though",
    "thought",
    "thoughts",
    "three",
    "through",
    "thus",
    "to",
    "today",
    "together",
    "too",
    "took",
    "toward",
    "turn",
    "turned",
    "turning",
    "turns",
    "two",
    "u",
    "under",
    "until",
    "up",
    "upon",
    "us",
    "use",
    "used",
    "uses",
    "v",
    "very",
    "w",
    "want",
    "wanted",
    "wanting",
    "wants",
    "was",
    "way",
    "ways",
    "we",
    "well",
    "wells",
    "went",
    "were",
    "what",
    "when",
    "where",
    "whether",
    "which",
    "while",
    "who",
    "whole",
    "whose",
    "why",
    "will",
    "with",
    "within",
    "without",
    "work",
    "worked",
    "working",
    "works",
    "would",
    "x",
    "we'd",
    "we'll",
    "we're",
    "we've",
    "y",
    "year",
    "years",
    "yet",
    "you",
    "young",
    "younger",
    "youngest",
    "your",
    "yours",
    "z"
  ];
}

function regexStopWord(stop_word) {
  var regex;
  var regex_str;


  // Trim stop word with regex
  regex_str = "^\\s*" + stop_word + "\\s*$";
  regex_str += "|^\\s*" + stop_word + "\\s+";
  regex_str += "|\\s+" + stop_word + "\\s*$";
  regex_str += "|\\s+" + stop_word + "\\s+";
  regex = new RegExp(regex_str, "ig");

  return regex;
}

String.prototype.rmStopWords = function () {
  var word;
  var stop_word;
  var your_wording = this.valueOf();


  words = your_wording.match(/[^\s]+|\s+[^\s+]$/g);

  for (var i = 0; i < words.length; i++) {

    for (var x = 0; x < getDictionary().length; x++) {
      word = words[i].replace(/\s+|[^a-z]+/ig, "");

      stop_word = getDictionary()[x];

      if (word.toLowerCase() == stop_word) {
        // Remove any found word from the keywords
        your_wording = your_wording.replace(regexStopWord(stop_word), " ");
      }
    }
  }

  return your_wording.replace(/^\s+|\s+$/g, "").split(' ');

}