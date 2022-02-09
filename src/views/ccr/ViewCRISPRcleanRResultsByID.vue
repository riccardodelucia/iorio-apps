<template>
  <BaseLayoutApp>
    <div class="layout-ccr">
      <h2 class="u-margin-bottom-small">Results</h2>
      <div class="ccr-results">
        <div
          v-if="result.status === 'success'"
          class="card ccr-results__downloads"
        >
          <h3 class="u-margin-bottom-small">Downloads</h3>
          <div>
            <button
              v-for="(file, index) in fileList"
              :key="index"
              @click="onClick(file, id)"
              class="button button--primary button--small"
              type="button"
            >
              {{ file }}&nbsp;<span><BaseIcon name="download" /></span>
            </button>
          </div>
        </div>
        <div class="card ccr-results__genes-signatures">
          <h3 class="u-margin-bottom-small">Genes Signatures</h3>
          <GeneSignatures :data="genesSignatures"> </GeneSignatures>
        </div>
        <div class="card ccr-results__details">
          <h3 class="u-margin-bottom-small">Details</h3>
          <ul>
            <li><b>Title: </b>{{ result.title }}</li>
            <li><b>Date: </b>{{ result.dateTime }}</li>
            <li><b>Status: </b>{{ result.status }}</li>
            <li><b>Input counts file: </b>{{ result.fileCountsName }}</li>
            <li><b>Library: </b>{{ result.library }}</li>
            <li><b>Number of controls: </b>{{ result.nControls }}</li>
            <li>
              <b>Minimal number of reads in the control sample: </b
              >{{ result.normMinReads }}
            </li>
            <li><b>Normalization Method: </b>{{ result.method }}</li>
            <li v-if="result.notes"><b>Notes: </b>{{ result.notes }}</li>
          </ul>
        </div>
        <BaseAccordion
          class="card ccr-results__thumbnails ccr-results__thumbnails--color1"
        >
          <template v-slot:title>Normalization</template>
          <template v-slot:content
            ><BaseThumbnail
              v-for="item in normImages"
              :key="item.filename"
              @click="openModal(item, id)"
              :img="item"
            ></BaseThumbnail></template
        ></BaseAccordion>
        <BaseAccordion
          class="card ccr-results__thumbnails ccr-results__thumbnails--color2"
        >
          <template v-slot:title>Chromosome Charts</template>
          <template v-slot:content>
            <BaseThumbnail
              v-for="item in chrImages"
              :key="item.filename"
              @click="openModal(item, id)"
              :img="item"
            ></BaseThumbnail></template
        ></BaseAccordion>
        <BaseAccordion
          class="card ccr-results__thumbnails ccr-results__thumbnails--color3"
        >
          <template v-slot:title>QC Assessment</template>
          <template v-slot:content>
            <BaseThumbnail
              v-for="item in qcImages"
              :key="item.filename"
              @click="openModal(item, id)"
              :img="item"
            ></BaseThumbnail></template
        ></BaseAccordion>
        <!--  <div
          class="card ccr-results__thumbnails ccr-results__thumbnails--color1"
        >
          <h3 class="u-margin-bottom-small">Main Charts</h3>
          <div>
            <BaseThumbnail
              v-for="item in normImages"
              :key="item.filename"
              @click="openModal(item, id)"
              :img="item"
            ></BaseThumbnail>
            <BaseThumbnail
              v-for="item in qcImages"
              :key="item.filename"
              @click="openModal(item, id)"
              :img="item"
            ></BaseThumbnail>
          </div>
        </div> -->
        <!--         <div
          class="card ccr-results__thumbnails ccr-results__thumbnails--color2"
        >
          <h3 class="u-margin-bottom-small">Chromosome Charts</h3>
          <div>
            <BaseThumbnail
              v-for="item in chrImages"
              :key="item.filename"
              @click="openModal(item, id)"
              :img="item"
            ></BaseThumbnail>
          </div>
        </div> -->
      </div>

      <template v-if="result.status === 'success'">
        <!-- <div class="downloads-container u-margin-top-small">
          <button
            v-for="(file, index) in fileList"
            :key="index"
            @click="onClick(file, id)"
            class="button button--primary button--small"
            type="button"
          >
            {{ file }}&nbsp;<span><BaseIcon name="download" /></span>
          </button>
        </div> -->
        <!--         <h3 class="u-margin-bottom-small">Genes Signatures</h3>
        <GeneSignatures :data="genesSignatures"> </GeneSignatures> -->

        <!--         <h3 class="u-margin-bottom-small">Cleaned chromosomes</h3>
        <div class="ccr-results__thumbnails">
          <BaseThumbnail
            v-for="item in chrImages"
            :key="item.filename"
            @click="openModal(item, id)"
            :img="item"
          ></BaseThumbnail>
        </div> -->

        <!--         <h3 class="u-margin-bottom-small">QC assessment</h3>
        <div class="ccr-results__thumbnails">
          <BaseThumbnail
            v-for="item in qcImages"
            :key="item.filename"
            @click="openModal(item, id)"
            :img="item"
          ></BaseThumbnail>
        </div> -->
        <BaseModal v-if="modalState != 'closed'" @modal-close="closeModal">
          <template v-slot:header>{{ image.label }} </template>
          <template v-slot:body>
            <component
              v-if="modalState === 'opened'"
              :is="image.component"
              :data="data"
            />
            <div v-else-if="modalState === 'loading'">Loading...</div>
          </template>
        </BaseModal>
      </template>
      <!--  <p v-else>
        Further content will appear here upon successful job completion...
      </p> -->
    </div>
  </BaseLayoutApp>
</template>

<script>
import CcrAPI from "@/api/ccr.js";
import fileList from "@/files.json";

import BoxPlotMultichart from "@/components/ccr/charts/boxplot/BoxPlotMultichart.vue";
import ComingSoon from "@/components/ComingSoon.vue";
import ChromosomeMultichart from "@/components/ccr/charts/chromosome/ChromosomeMultichart.vue";
import LineChartROC from "@/components/ccr/charts/linechart/LineChartROC.vue";
import LineChartPrRc from "@/components/ccr/charts/linechart/LineChartPrRc.vue";
import GeneSignatures from "@/components/ccr/charts/genes_signatures/GeneSignatures.vue";

import { download } from "@/composables/download.js";

import { ref, computed } from "vue";

const image = ref({});
const data = ref({});
const modalState = ref("closed");

const openModal = (img, id) => {
  modalState.value = "loading";
  CcrAPI.getChart({
    id,
    chart: img.chart,
  }).then((response) => {
    data.value = response.data;
    image.value = img;
    modalState.value = "opened";
  });
};

const closeModal = () => {
  image.value = {};
  data.value = {};
  modalState.value = "closed";
};

const onClick = (file, id) => {
  CcrAPI.getFile({ id, fileUri: file })
    .then((response) => {
      download(response.data, file);
    })
    .catch((err) => {
      console.error("Something went wrong with downloading the file: " + err);
    });
};

export default {
  name: "ViewCRISPRcleanRResultShow",
  components: {
    BoxPlotMultichart,
    ChromosomeMultichart,
    LineChartROC,
    LineChartPrRc,
    ComingSoon,
    GeneSignatures,
  },
  props: {
    id: {
      type: String,
    },
    imageList: {
      type: Array,
      required: true,
    },
    result: {
      type: Object,
      required: true,
    },
    genesSignatures: { type: Object, required: true },
  },
  setup(props) {
    const normImages = computed(() => {
      return props.imageList.filter((image) => image.section === "norm");
    });
    const chrImages = computed(() => {
      return props.imageList
        .filter((image) => image.section === "chr")
        .sort((image1, image2) => {
          const a = parseInt(image1.filename.match(/(\d+)/)[0]);
          const b = parseInt(image2.filename.match(/(\d+)/)[0]);
          return a - b;
        });
    });
    const qcImages = computed(() => {
      return props.imageList.filter((image) => image.section === "qc");
    });

    return {
      fileList,
      openModal,
      closeModal,
      onClick,
      image,
      data,
      modalState,
      normImages,
      chrImages,
      qcImages,
    };
  },
};
</script>

<style lang="scss">
.ccr-results {
  display: grid;
  grid-template-columns: repeat(8, minmax(min-content, 14rem)) 1fr;
  grid-column-gap: 1.2em;
  grid-row-gap: 1.5em;
  margin-bottom: 2em;

  &__details {
    grid-column: 1 / 5;
    grid-row: 1 / 2;
  }

  &__downloads {
    grid-column: 1 / 4;
    grid-row: 2 / 3;

    div {
      margin-bottom: 1em;
      display: flex;
      gap: 1em;
      flex-wrap: wrap;
    }
  }
  &__genes-signatures {
    grid-column: 5 / 9;
    grid-row: 1 / 3;
  }

  &__thumbnails {
    grid-column: 1/ -1;

    &--color1 {
      background-color: rgb(232, 232, 253);
    }
    &--color2 {
      background-color: rgb(212, 255, 208);
    }
    &--color3 {
      background-color: rgb(163, 210, 253);
    }

    div {
      display: grid;
      grid-gap: 2rem;
      grid-template-columns: repeat(auto-fit, 32rem);
    }
  }
}
</style>
