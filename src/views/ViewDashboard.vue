<template>
  <div class="dashboard">
    <h2 class="heading-secondary u-margin-top-medium">
      Apps, Tools and Computable Manuscripts
    </h2>
    <div class="app-cards__container u-padding-content">
      <AppsCard
        v-for="item in tools"
        :key="item.title"
        :cardData="item"
      ></AppsCard>
    </div>
  </div>
</template>

<script>
import AppsCard from "@/components/AppsCard";

export default {
  name: "ViewDashboard",
  components: { AppsCard },
  data() {
    return {
      tools: [
        {
          title: "CRISPRcleanR",
          text: "Pre-processing of CRISPR-KO screening data and correction of gene independent responses to CRISPR-Cas9 targeting.",
          logo: "CCRlogo.jpeg",
          app: "/ccr/home",
          links: [
            {
              logo: "github.png",
              url: "https://github.com/francescojm/CRISPRcleanR",
            },
            {
              logo: "paper.png",
              url: "https://bmcgenomics.biomedcentral.com/articles/10.1186/s12864-018-4989-y",
            },
            {
              logo: "paper.png",
              url: "https://www.biorxiv.org/content/10.1101/2022.03.11.483924v1.full",
            },
          ],
        },
        {
          title: "coRe",
          text: "Identification of core fitness genes from joint analyses of multiple genome-wide CRISPR-Cas9 screens.",
          logo: "core.png",
          links: [
            {
              logo: "github.png",
              url: "https://github.com/DepMap-Analytics/CoRe",
            },
            {
              logo: "colab.png",
              url: "https://colab.research.google.com/github/DepMap-Analytics/CoRe/blob/master/notebooks/CoRe_Benchmarking.ipynb",
            },
            {
              logo: "paper.png",
              url: "https://bmcgenomics.biomedcentral.com/articles/10.1186/s12864-021-08129-5",
            },
          ],
        },
        {
          title: "CELLector",
          text: "Patient-genomics-guided selection of cancer in vitro models allowing in-silico drug/target prescriptions.",
          logo: "cellector.png",
          links: [
            {
              logo: "github.png",
              url: "https://github.com/francescojm/CELLector",
            },
            {
              logo: "shiny.png",
              url: "https://ot-cellector.shinyapps.io/CELLector_App/",
            },
            {
              logo: "paper.png",
              url: "https://www.cell.com/cell-systems/fulltext/S2405-4712(20)30150-2",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.dashboard {
  grid-column: 2 / -2;
  padding: 1em 0;

  h2 {
    text-align: center;
    margin-bottom: 1em;
  }
}
.app-cards__container {
  display: grid;
  grid-column: 3 / -3;
  justify-content: center;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  justify-items: center;
}
</style>
