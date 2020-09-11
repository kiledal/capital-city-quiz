<template>
  <div class="game" v-if="activeRound">
    <p>What’s the Capital City of</p>
    <h1 class="country__title">
      <img class="country__flag" :src="activeRound.flag" aria-hidden />
      <span class="country__name">{{ activeRound.name }}</span>
    </h1>

    <div v-if="!isWrong" class="guess">
      <form @submit.prevent="makeGuess" class="guess__form">
        <input type="text" v-model="guess" class="guess__field" ref="guess" />
        <button class="guess__button">Send</button>
      </form>
    </div>

    <div v-show="isWrong" class="answer">
      {{ encouragement }} The answer is <strong>{{ activeRound.capital }}</strong
      >.

      <div class="keep-playing">
        <button @click="play" ref="play">Keep playing</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import phrases from '../config/encouragement'

export default {
  name: 'Game',
  data: () => ({
    guess: '',
    isWrong: false,
    encouragement: '',
  }),
  computed: {
    ...mapState(['activeRound']),
  },

  methods: {
    ...mapMutations(['SET_ACTIVE_ROUND']),
    makeGuess() {
      if (this.guess.toLowerCase() === this.activeRound.capital.toLowerCase()) {
        this.guess = ''
        this.$refs.guess.focus()
        this.SET_ACTIVE_ROUND()
      } else {
        this.isWrong = true
        this.encouragement = phrases[Math.floor(Math.random() * phrases.length)]

        setTimeout(() => {
          this.$refs.play.focus()
        }, 1)
      }
    },
    play() {
      this.guess = ''
      this.isWrong = false
      this.SET_ACTIVE_ROUND()

      setTimeout(() => {
        this.$refs.guess.focus()
      }, 1)
    },
  },

  mounted() {
    this.play()
  },
}
</script>

<style lang="scss" scoped>
.game {
  width: 100%;
  height: 100%;
  max-width: 40rem;
  min-height: 20rem;
  align-self: center;
  padding: 1rem;
}

.country {
  &__title {
    display: flex;
    align-content: center;
    font-size: 1.75rem;
    font-weight: 700;
    margin: 1rem 0 2.5rem;
  }
  &__flag {
    display: inline-block;
    align-self: center;
    width: 2.5rem;
    margin-right: 0.5rem;
  }

  &__name {
    align-content: center;
  }
}

button {
  font-size: 1rem;
  border: 0;
  background: rgba(black, 0.88);
  color: white;
  font-weight: 700;
  padding: 1rem;
}

strong {
  font-weight: 700;
}

.guess {
  &__form {
    display: flex;
  }
  &__field {
    font-size: 1rem;
    background: rgba(white, 0.3);
    border: 0;
    flex-grow: 1;
    padding: 1rem;
    border-radius: 0.15rem;
  }
}

.keep-playing {
  margin-top: 1rem;
}
</style>
