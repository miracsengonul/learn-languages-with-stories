<template>
  <div
    class="md:max-w-xl lg:max-w-lg xl:max-w-6xl 2xl:max-w-7xl md:block md:m-auto min-h-screen"
  >
    <Navbar />
    <div class="flex justify-center flex-col text-center md:items-center">
      <div id="cover-area" class="relative cover">
        <img
          style="
            border-bottom-right-radius: 5px;
            border-bottom-left-radius: 5px;
          "
          class="object-cover image-cover shadow dark:opacity:50 max-h-full md:max-h-35vh w-screen md:block md:m-auto"
          src="https://flowbite.com/docs/images/blog/image-1.jpg"
          alt=""
        />

        <div class="p-2 absolute inset-0 flex justify-center items-center">
          <h5
            @click="showTranslatedTitle = !showTranslatedTitle"
            v-if="!showTranslatedTitle"
            class="cursor-pointer shadow-2xl p-1 title bg-yellow-300 text-2xl tracking-tight text-gray-900 dark:bg-gray-400 dark:text-white"
          >
            {{ title }}
          </h5>
          <h5
            @click="showTranslatedTitle = !showTranslatedTitle"
            v-else
            class="cursor-pointer shadow-2xl p-1 title bg-yellow-300 text-2xl tracking-tight text-gray-900 dark:bg-gray-400 dark:text-white"
          >
            {{ translatedTitle }}
          </h5>
        </div>
      </div>

      <div
        v-if="selectedWord"
        id="word-information"
        class="flex flex-col min-w-full items-start p-1.5 space-x-2 rounded-t-none rounded-b-none bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="flex items-center space-x-2">
          <div class="flex rounded-3xl justify-center text-black ml-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-play-fill fill-current text-lime-600 dark:fill-current dark:text-indigo-300"
              viewBox="0 0 16 16"
            >
              <path
                d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
              />
            </svg>
          </div>
          <div
            v-if="!isTranslationProgress"
            @click="copyText(selectedWord)"
            class="flex dark:text-white"
          >
            <span
              class="ml-1.5 cursor-pointer"
              :style="{ 'font-size': getFontSize }"
            >
              {{ processedSelectedWord }}
            </span>
          </div>
          <div v-else class="flex dark:text-white">
            <div class="lds-ellipsis">
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
        <hr class="w-full h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

        <div class="flex items-center space-x-2">
          <country-flag
            :country="targetLanguage"
            @click.native="isClickedTranslatedWord = !isClickedTranslatedWord"
            size="small"
            class="flex items-center cursor-pointer hover:opacity-80 rounded-md"
          />

          <div class="space-x-4" v-if="isClickedTranslatedWord">
            <country-flag
              country="tr"
              @click.native="setTargetLanguage('tr')"
              size="normal"
              class="cursor-pointer hover:opacity-80 rounded-md"
            />
            <country-flag
              country="de"
              @click.native="setTargetLanguage('de')"
              size="normal"
              class="cursor-pointer hover:opacity-80 rounded-md"
            />
            <country-flag
              country="ru"
              @click.native="setTargetLanguage('ru')"
              size="normal"
              class="cursor-pointer hover:opacity-80 rounded-md"
              style="margin-left: 0"
            />
            <country-flag
              country="fr"
              @click.native="setTargetLanguage('fr')"
              size="normal"
              class="cursor-pointer hover:opacity-80 rounded-md"
              style="margin-left: 0"
            />
            <country-flag
              country="it"
              @click.native="setTargetLanguage('it')"
              size="normal"
              class="cursor-pointer hover:opacity-80 rounded-md"
              style="margin-left: 0"
            />
            <country-flag
              country="sa"
              @click.native="setTargetLanguage('ar')"
              size="normal"
              class="cursor-pointer hover:opacity-80 rounded-md"
              style="margin-left: 0"
            />
          </div>
          <span
            v-if="!isTranslationProgress && !isClickedTranslatedWord"
            class="flex select-none dark:text-white"
            :style="{ 'font-size': getFontSize }"
          >
            {{ processedTranslation }}
          </span>
          <div v-else-if="isTranslationProgress" class="flex dark:text-white">
            <div class="lds-ellipsis">
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="relative p-2 mt-2 mb-2 flex items-center mt-6">
      <div
        class="md:pl-0 pl-2 md:pl-1 absolute left-0 mr-3 flex items-center space-x-4 justify-end mb-2"
      >
        <div
          class="level-badge select-none dark:bg-gray-900 dark:text-gray-300 bg-blue-400 text-white p-1 w-max rounded-md text-sm font-bold mb-3"
        >
          B1
        </div>
        <svg
          id="search-icon"
          @click="showSearchInput"
          v-if="!isClickedSearchButton"
          xmlns="http://www.w3.org/2000/svg"
          :width="isClickedSearchButton ? 26 : 22"
          fill="currentColor"
          class="bi bi-search cursor-pointer dark:fill-current dark:text-gray-300"
          viewBox="0 0 16 16"
        >
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
          />
        </svg>
        <input
          v-if="isClickedSearchButton"
          @keyup.esc="isClickedSearchButton = false"
          ref="searchInput"
          placeholder="Search a word"
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-600 dark:border-indigo-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
          :value="searchTerm"
          @input="(evt) => (searchTerm = evt.target.value)"
        />
        <div
          disabled
          class="pointer-events-none flex space-x-1 dark:text-gray-300"
          v-if="
            isClickedSearchButton &&
            searchTerm.length >= 3 &&
            searchResultsCount
          "
        >
          <span class="font-bold text-2xl">
            {{ searchResultsCount }}
          </span>
          <div>Result</div>
        </div>
      </div>

      <div
        id="add-word-to-training"
        v-if="!isClickedSearchButton"
        class="absolute right-0 mr-2 md:mr-0 flex items-center space-x-4 justify-end mb-2"
      >
        <div
          v-if="
            !isTranslationProgress && selectedWord && !isClickedSentencePressed
          "
          @click="favoritedWord = !favoritedWord"
          class="mt-0.5 cursor-pointer"
        >
          <!-- Add To Word Training-->
          <div>
            <svg
              v-if="!favoritedWord"
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="currentColor"
              class="bi bi-patch-plus dark:fill-current dark:text-gray-100 md:hover:opacity-50"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"
              />
              <path
                d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="currentColor"
              class="bi bi-patch-check-fill fill-current text-lime-700 dark:fill-current dark:text-gray-100 md:hover:opacity-50"
              viewBox="0 0 16 16"
            >
              <path
                d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"
              />
            </svg>
          </div>
          <!-- /Add To Word Training-->
        </div>
        <div :key="textKey" @click="toggleDarkMode">
          <svg
            v-if="!darkModeStatus"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            class="bi bi-moon cursor-pointer md:hover:opacity-50"
            viewBox="0 0 16 16"
          >
            <path
              d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#e2e2e2"
            class="bi bi-moon-stars-fill cursor-pointer md:hover:opacity-50"
            viewBox="0 0 16 16"
          >
            <path
              d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"
            />
            <path
              d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"
            />
          </svg>
        </div>
        <!--/Dark Mode Toogle-->

        <!--Font Size Increase-->
        <svg
          @click="fontSize += 1"
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          class="bi bi-file-earmark-plus dark:fill-current dark:text-gray-300 cursor-pointer md:hover:opacity-50"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"
          />
          <path
            d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"
          />
        </svg>
        <!--/Font Size Increase-->
        <!--Font Size Decrease-->
        <svg
          @click="fontSize -= 1"
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          class="bi bi-file-earmark-minus dark:fill-current dark:text-gray-300 cursor-pointer md:hover:opacity-50"
          viewBox="0 0 16 16"
        >
          <path
            d="M5.5 9a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"
          />
          <path
            d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"
          />
        </svg>
        <!--/Font Size Decrease-->
        <div @click="read">
          <!--Eye-->
          <svg
            v-if="!isRead"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-eye dark:fill-current dark:text-gray-300 cursor-pointer md:hover:opacity-50"
            viewBox="0 0 16 16"
          >
            <path
              d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
            />
            <path
              d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
            />
          </svg>
          <!--/Eye-->
          <!--Fill Eye-->
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-eye-fill dark:fill-current dark:text-gray-300 cursor-pointer md:hover:opacity-50"
            viewBox="0 0 16 16"
          >
            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
            <path
              d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
            />
          </svg>
          <!--/Fill Eye-->
        </div>

        <div @click="saved">
          <svg
            v-if="!isSaved"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-bookmark dark:fill-current dark:text-gray-300 cursor-pointer md:hover:opacity-50"
            viewBox="0 0 16 16"
          >
            <path
              d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-bookmark-fill dark:fill-current dark:text-gray-300 cursor-pointer md:hover:opacity-50"
            viewBox="0 0 16 16"
          >
            <path
              d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center pb-15">
      <div
        class="mt-1.5 mr-1 ml-1 md:ml-auto md:mr-auto md:mb-4 max-w-md md:max-w-md lg:max-w-lg xl:max-w-6xl 2xl:max-w-7xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <div id="read-area" :key="textKey" class="p-2 mb-2">
          <div
            class="inline-block box mb-3 dark:text-gray-400 overflow-y-auto overflow-x-hidden max-h-35vh md:max-h-full"
            :style="{ 'font-size': getFontSize }"
          >
            <div
              v-for="(sentence, index) in words"
              :key="index"
              :class="{
                'selected-sentence select-none rounded max-w-max bg-lime-400 dark:bg-indigo-400 dark:text-gray-800':
                  highlighted[index] && !isThereSelectedWord,
              }"
              class="relative-sentence inline"
            >
              <span
                v-for="(word, wordIndex) in sentence"
                :key="wordIndex"
                class="letter-word select-none cursor-pointer rounded pl-1 pr-1"
                :style="isSpecialCharacters(word) ? 'margin-left:-6px' : ''"
                :class="
                  highlighted[index] &&
                  highlighted[index].length &&
                  highlighted[index].includes(wordIndex)
                    ? 'selected-word bg-lime-400 rounded pl-1 pr-1 dark:bg-indigo-400 dark:text-gray-800'
                    : 'unselected-word md:hover:bg-yellow-100 md:dark:hover:bg-indigo-50 md:dark:hover:text-gray-700'
                "
                @click="
                  !isSpecialCharacters(word)
                    ? selectWord(word, index, wordIndex)
                    : selectWord(sentence[index], index, wordIndex - 1)
                "
                >{{ word }}
              </span>
            </div>
          </div>
          <div
            class="flex items-center space-x-2 justify-center"
            :class="{ 'h-2.5': !selectedWord }"
          >
            <button
              v-if="selectedWord"
              type="button"
              @click="playSound"
              class="select-none text-gray-900 border-2 border-gray-600 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2 dark:bg-indigo-400 dark:text-gray-800 dark:border-gray-800 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  class="bi bi-play"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"
                  />
                </svg>
                Voice it
              </div>
            </button>
            <button
              @click="selectSentence"
              id="select-sentence"
              v-if="selectedWord && !isClickedSentencePressed"
              type="button"
              class="select-none text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              <div>Select Sentence</div>
            </button>

            <button
              type="button"
              class="focus:outline-none text-white focus:ring-4 font-medium rounded-lg text-sm mr-2 mb-2 p-0.5"
              :class="
                !isPlaying
                  ? 'bg-yellow-400 focus:ring-yellow-300 dark:bg-gray-400 dark:focus:ring-yellow-900'
                  : 'bg-red-500 focus:ring-red-300 dark:focus:ring-red-900'
              "
            >
              <span v-if="isPlaying" @click="pauseSound">
                <!--Pause-->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-pause-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"
                  />
                </svg>
              </span>
              <span v-else-if="currentSentenceIndex" @click="resumeSound">
                <!--Resume-->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-play-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
                  />
                </svg>
              </span>
              <span v-else @click="startReading">
                <!--Start-->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-play-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
                  />
                </svg>
              </span>
            </button>
            <button
              v-if="!isPlaying && currentSentenceIndex"
              @click="startReading"
              type="button"
              style="margin: -8px 0 0 8px"
              class="bg-green-500 rounded-3xl focus:ring-yellow-300 dark:focus:ring-yellow-900 focus:outline-none text-white focus:ring-4 text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-stop"
                viewBox="0 0 16 16"
              >
                <path
                  d="M3.5 5A1.5 1.5 0 0 1 5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5zM5 4.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H5z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ClickOutside from "vue-click-outside";
import Navbar from "./Navbar.vue";
import CountryFlag from "vue-country-flag";

export default {
  components: {
    Navbar,
    CountryFlag,
  },
  data() {
    return {
      text: "",
      sentences: [],
      cloneSentences: [],
      highlighted: Array(3).fill(false),
      audio: new Audio(),
      isPlaying: false,
      currentSentenceIndex: "",
      words: [],
      isThereSelectedWord: false,
      selectedWord: "",
      selectedSentence: "",
      isClickedSentencePressed: false,
      showTranslatedTitle: false,
      title: "",
      translatedTitle: "",
      isSaved: false,
      isRead: false,
      fontSize: 16,
      textKey: 0,
      darkModeStatus: false,
      translation: "",
      isTranslationProgress: false,
      favoritedWord: false,
      isClickedSearchButton: false,
      searchTerm: "",
      isClickedTranslatedWord: false,
      targetLanguage: "tr",
    };
  },
  directives: {
    ClickOutside,
  },
  created() {
    this.text = `Once upon a time, in a small village nestled among rolling green hills, there lived a young girl named Lily. She had a heart as big as the sun and a smile that could brighten the cloudiest of days. Lily was known for her kindness and willingness to help anyone in need.
    One day, as she was walking by the river, she noticed a wounded bird with a broken wing. Without hesitation, she gently picked up the bird and cradled it in her hands. Determined to help the little creature, she sought the advice of the village elder, who suggested she build a small shelter for the bird to heal.
    Lily followed the elder's advice and created a cozy nest, where she fed and cared for the bird until it regained its strength. She named the bird Ruby because of its vibrant red feathers. As days turned into weeks, Lily and Ruby formed a special bond. They would spend their afternoons together, exploring the meadows and singing songs.
    Over time, the bird's wing healed, and it was able to fly away. Lily watched with a mixture of joy and sadness as Ruby soared high into the sky, a symbol of freedom and resilience. The village hailed Lily as a hero, and her act of kindness inspired others to show compassion and lend a helping hand whenever they could.`;

    const { text } = this;

    /* const needsToBeWhole = [
      {
        sentenceIndex: 0,
        indexes: [2, 4],
        word: "andenken",
      },
      {
        sentenceIndex: 3,
        indexes: [1, 2, 3],
        word: "amüsierten sich über",
      },
    ]; */

    const needsToBeWhole = [];
    const sentenceRegExp = /[^.!?]*[.!?]+/g;
    const matches = text.match(sentenceRegExp);
    const sentences = [];
    const punctuationMarks = [];
    let currentIndex = 0;
    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      const startIndex = text.indexOf(match, currentIndex);
      const endIndex = startIndex + match.length;
      const segment = text.substring(currentIndex, endIndex);
      sentences.push(segment.trim());
      punctuationMarks.push(match.trim());
      currentIndex = endIndex;
    }

    this.sentences = sentences.map((sentence, sentenceKey) => {
      const separableVerbs = [];
      needsToBeWhole.filter((rule) => {
        if (rule.sentenceIndex === sentenceKey) {
          separableVerbs.push({
            indexes: rule.indexes,
            word: rule.word,
          });
        }
      });

      return {
        text: sentence,
        separableVerbs,
      };
    });
    this.words = this.sentences.map((sentence) => sentence.text.split(" "));

    window.screen.width >= 1024 ? (this.fontSize = 20) : (this.fontSize = 18);
  },
  mounted() {
    this.title =
      "The Little Girl Who Changed the World with Her Story: Lily and Ruby";
    this.translatedTitle =
      "Hikayesiyle Dünyayı Değiştiren Küçük Kız: Lily ve Ruby";
    if (!localStorage.getItem("theme")) {
      document.documentElement.classList.remove("dark");
    } else if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      this.darkModeStatus = true;
    } else {
      document.documentElement.classList.remove("dark");
      this.darkModeStatus = false;
    }
    this.textKey += 1;
    document.addEventListener("click", (event) => {
      if (
        !event.target.closest("#read-area") &&
        !event.target.closest("#select-sentence") &&
        !event.target.closest("#add-word-to-training") &&
        !event.target.closest("#search-icon") &&
        !event.target.closest("#word-information") &&
        !event.target.closest("#cover-area")
      ) {
        this.isClickedSearchButton = false;
        this.isClickedTranslatedWord = false;
        this.selectedWord = "";
        this.highlighted = Array(3).fill(false);
        this.pauseSound();
      }
    });
  },
  watch: {
    searchTerm() {
      this.searchWord();
    },
  },
  computed: {
    searchResultsCount() {
      return this.highlighted
        .flat(0)
        .filter((item) => Array.isArray(item))
        .flat().length;
    },
    processedSelectedWord() {
      if (this.isClickedSentencePressed) {
        return this.selectedWord;
      }

      const selectedWord = this.selectedWord;
      const processedWord = selectedWord.replace(/[^\p{L}\p{N}\s]/gu, "");

      return processedWord;
    },
    processedTranslation() {
      if (this.isClickedSentencePressed) {
        return this.translation;
      }

      const selectedTranslation = this.translation;
      const processedTranslation = selectedTranslation.replace(
        /[^\p{L}\p{N}\s]/gu,
        ""
      );

      return processedTranslation;
    },
    getFontSize() {
      if (this.fontSize <= 12) {
        return 12;
      } else if (this.fontSize >= 24) {
        return 24;
      }

      return `${this.fontSize}px`;
    },
    isDarkTheme() {
      return !!(
        localStorage.getItem("theme") &&
        localStorage.getItem("theme") === "dark"
      );
    },
  },
  methods: {
    isSpecialCharacters(character) {
      return ["...", "?", ":", "!"].includes(character);
    },
    read() {
      const text = this.isRead
        ? "Story Marked as Unread !"
        : "Story Marked as Read !";
      const type = this.isRead ? this.$toast.error : this.$toast.success;
      this.isRead = !this.isRead;
      type(text, {
        position: "top-center",
        timeout: 2800,
        closeOnClick: false,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    },
    saved() {
      const text = this.isSaved ? "Story Not Saved !" : "Story Saved !";
      const type = this.isSaved ? this.$toast.error : this.$toast.success;
      this.isSaved = !this.isSaved;
      type(text, {
        position: "top-center",
        timeout: 3100,
        closeOnClick: false,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    },
    selectSentence() {
      this.isClickedSearchButton = false;
      this.selectedWord = `${this.selectedSentence}`;

      const sentenceIndex = this.sentences.findIndex(
        (sentence) => sentence.text === this.selectedSentence
      );
      if (sentenceIndex || sentenceIndex === 0) {
        this.highlighted = Array(3).fill(false);
        this.highlighted[sentenceIndex] = true;
        this.isThereSelectedWord = false;
      }
      this.isClickedSentencePressed = true;
      // @TODO DeepL API sonucu dönecek.
      this.translate();
    },
    async playSound() {
      await this.speak(this.selectedWord);
    },
    async resumeSound() {
      setTimeout(() => {
        this.selectedWord = "";
        this.isClickedSentencePressed = true;
      }, 50);
      for (let i = 0; i < this.cloneSentences.length; i++) {
        this.highlighted = [];
        this.highlighted[this.currentSentenceIndex] = true;

        this.isThereSelectedWord = false;
        this.isPlaying = true;
        // eslint-disable-next-line no-await-in-loop
        await this.speak(this.cloneSentences[i].text, i, false);
        this.currentSentenceIndex += 1;
      }
      this.isPlaying = false;
      this.currentSentenceIndex = "";
    },
    async pauseSound() {
      this.audio.pause();
      this.isPlaying = false;
      this.cloneSentences = [...this.sentences];
      this.cloneSentences.slice(0, this.currentSentenceIndex);
      this.cloneSentences.splice(0, this.currentSentenceIndex);
    },
    async startReading() {
      this.selectedWord = "";
      for (let i = 0; i < this.sentences.length; i++) {
        this.isPlaying = true;

        // eslint-disable-next-line no-await-in-loop
        await this.speak(this.sentences[i].text, i);
      }
      this.isPlaying = false;
      this.highlighted = Array(3).fill(false);
    },
    async speak(word, sentenceIndex, isHighlightedActive = true) {
      const audioSrc = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.VUE_APP_GOOGLE_API_KEY}`;
      const body = {
        input: { text: word },
        voice: {
          languageCode: "en-GB",
          name: "en-GB-News-I",
          ssmlGender: "FEMALE",
        },
        audioConfig: { audioEncoding: "MP3" },
      };
      try {
        const response = await axios.post(audioSrc, body);
        const { audioContent } = response.data;
        this.audio.pause();
        const blob = new Blob([this.base64ToArrayBuffer(audioContent)], {
          type: "audio/mpeg",
        });
        const url = URL.createObjectURL(blob);
        this.audio = new Audio(url);
        this.audio.play();

        if ((sentenceIndex || sentenceIndex === 0) && isHighlightedActive) {
          this.highlighted = Array(3).fill(false);
          this.highlighted[sentenceIndex] = true;
          this.isThereSelectedWord = false;
          this.currentSentenceIndex = sentenceIndex;
        }

        await new Promise((resolve) => {
          this.audio.addEventListener("ended", () => {
            resolve();
          });
        });
      } catch (error) {
        console.error(error);
      }
    },
    selectWord(word, sentenceIndex, wordIndex) {
      if (wordIndex || wordIndex === 0) {
        this.isClickedSearchButton = false;

        this.highlighted = Array(this.sentences.length)
          .fill(null)
          .map(() => []);

        const separableVerbsObject = this.sentences[sentenceIndex]
          .separableVerbs
          ? this.sentences[sentenceIndex].separableVerbs.filter(
              (separableVerb) => separableVerb.indexes.includes(wordIndex)
            )[0]
          : [];
        if (separableVerbsObject && separableVerbsObject.word) {
          this.selectedWord = separableVerbsObject.word;
          separableVerbsObject.indexes.forEach((separableVerbIndex) =>
            this.highlighted[sentenceIndex].push(separableVerbIndex)
          );
        }

        this.highlighted[sentenceIndex].push(wordIndex);
        if (this.highlighted[sentenceIndex].length <= 1) {
          this.selectedWord = word;
        }
        this.selectedSentence = this.sentences[sentenceIndex].text;
        this.isThereSelectedWord = true;
        this.audio.pause();
        this.isClickedSentencePressed = false;
        this.translate();
      }
    },
    base64ToArrayBuffer(base64) {
      const binaryString = window.atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      return bytes.buffer;
    },
    toggleDarkMode() {
      if (localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        this.darkModeStatus = false;
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        this.darkModeStatus = true;
      }
      this.textKey += 1;
    },
    translate() {
      this.isTranslationProgress = true;

      try {
        axios
          .post(
            `https://translation.googleapis.com/language/translate/v2?key=${process.env.VUE_APP_GOOGLE_API_KEY}`,
            {
              q: this.selectedWord,
              source: "en",
              target: this.targetLanguage,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            this.translation =
              response.data.data.translations[0].translatedText.replace(
                /&#([0-9]{1,3});/gi,
                (match, numStr) => {
                  const num = parseInt(numStr, 10); // read num as normal number
                  return String.fromCharCode(num);
                }
              );
            this.isTranslationProgress = false;
            setTimeout(() => {
              window.scrollTo(0, document.body.scrollHeight);
            }, 100);
          });
      } catch (error) {
        console.error(error);
        this.isTranslationProgress = false;
      }
    },
    copyText(text) {
      navigator.clipboard.writeText(text);

      this.$toast.info("Copied!", {
        position: "top-right",
        timeout: 750,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    },
    searchWord() {
      this.selectedWord = "";
      this.selectedSentence = "";
      setTimeout(() => {
        const sentenceIndexValues = [];
        if (this.searchTerm.length >= 3) {
          // Büyük/küçük harf hassasiyeti olmaksızın arama yapmak için RegExp kullanıyoruz
          const regexTerm = new RegExp(this.searchTerm, "i");

          this.words.filter((sentences, sentenceIndex) => {
            if (regexTerm.test(sentences)) {
              sentenceIndexValues.push(sentenceIndex);
              sentences.forEach((word, wordIndex) => {
                if (regexTerm.test(word)) {
                  sentenceIndexValues[sentenceIndex] = [];
                  sentenceIndexValues[sentenceIndex].push(wordIndex);
                }
              });
            }
          });
          this.selectedWord = "";
          this.selectedSentence = "";
          this.isThereSelectedWord = true;
          this.highlighted = sentenceIndexValues;
        } else {
          this.highlighted = Array(3).fill(false);
        }
      }, 50);
    },
    showSearchInput() {
      this.searchTerm = "";
      this.isClickedSearchButton = true;
      if (this.isClickedSearchButton) {
        this.$nextTick(() => this.$refs.searchInput.focus());
      } else {
        this.searchTerm = "";
      }
    },
    setTargetLanguage(language) {
      this.targetLanguage = language;
      this.isClickedTranslatedWord = false;
    },
  },
};
</script>

<style lang="postcss" scoped>
.image-cover {
  opacity: 0.6;
}
.title {
  font-weight: 500;
  text-shadow: 0 1px black;
  border-radius: 10px;
}
.relative-sentence > span:not(:last-child) {
  padding-right: 3px;
}
.selected-sentence span:first-child {
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  padding-left: 0.25rem;
}
.selected-sentence span:last-child {
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  padding-right: 0.05rem;
}
.level-badge {
  margin: 0;
}
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;
}
.lds-ellipsis div {
  position: absolute;
  top: 20px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgb(129 140 248);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
