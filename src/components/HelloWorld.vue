<template>
  <div class="hello">
    <div id="threejs-container"><canvas id="canvas"></canvas></div>

    <div id="question">
      <h1>{{ question }}</h1>
    </div>
  </div>
</template>

<script>
import SceneManager from "./js/threejs-script.js";
import Stats from "stats-js";
import Shake from "shake.js";
import ColorPalette from "./js/ColorPalette.js";
import Rita from "rita";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      sceneManager: null,
      stats: null,
      colorIndex: 0,
      question: null,
      articleIndex: 0
    };
  },
  methods: {
    render: function() {
      this.stats.begin();
      requestAnimationFrame(this.render);
      this.sceneManager.update();
      this.stats.end();
    },

    setupShake: function() {
      var myShakeEvent = new Shake({
        threshold: 10, // optional shake strength threshold
        timeout: 1000 // optional, determines the frequency of event generation
      });

      myShakeEvent.start();

      window.addEventListener(
        "shake",
        () => {
          //put your own code here etc.
          // alert("shake!");
          document.getElementById("canvas").style.backgroundColor =
            ColorPalette.colors[this.colorIndex % ColorPalette.colors.length];
          this.colorIndex += 1;

          this.articleIndex += 1;
          this.getNextNews();
        },
        false
      );
    },
    getTrendingNews: function() {
      var url =
        "https://newsapi.org/v2/top-headlines?" +
        "country=gb&" +
        "apiKey=9097f737932c4681bd54a2ed6a71dbf1";
      fetch(url)
        .then(response => {
          return response.json();
        })
        .then(myJson => {
          if (this.articleIndex >= myJson.articles.length) {
            this.articleIndex = 0;
          }
          let topArticle = myJson.articles[this.articleIndex].title;
          let split = Rita.tokenize(topArticle);
          let tags = Rita.getPosTags(topArticle);
          let nouns = [];
          tags.forEach((element, index) => {
            // console.log(element);
            if (element.includes("nn")) {
              nouns.push(split[index]);
            }
          });

          console.log(nouns);

          if (nouns.length > 1) {
            this.question = `What if ${nouns[0]} ${nouns[1]}`;
          } else {
            this.question = `What if ${nouns[0]}`;
          }
          console.log(this.question);
        });
    },

    getNextNews: function() {}
  },
  mounted() {
    var canvas = document.getElementById("canvas");
    this.sceneManager = new SceneManager(canvas);
    this.stats = new Stats();
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);

    this.render();
    // this.setupShake();
    // this.getTrendingNews();

    //function to call when shake occurs
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#threejs-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: -1;
}

#question {
  width: 80%;
  height: 80%;
  left: 10%;
  top: 10%;
  position: absolute;
  background: rgba(0, 0, 0, 0);
  color: white;
}
</style>
