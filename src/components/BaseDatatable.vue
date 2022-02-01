<template>
  <div>
    <div class="u-space-content">
      <BaseSearchBar
        :value="search"
        @search="setSearch"
        class="u-margin-bottom-small"
      ></BaseSearchBar>
      <div>
        <select
          v-model="itemsPerPage"
          @change="resetPagination()"
          class="table__n-items-selector"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
    <table class="table">
      <thead class="table__head">
        <tr>
          <th
            v-for="column in columns"
            :key="column.name"
            class="table__head-item"
            :class="
              sortable(column)
                ? sortKey === column.name
                  ? sortOrders[column.name] > 0
                    ? 'table__head-item--sorting-asc'
                    : 'table__head-item--sorting-desc'
                  : 'table__head-item--sorting'
                : ''
            "
            :style="'width:' + column.width"
            @click="sortable(column) && sortBy(column.name)"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody class="table__body">
        <tr
          v-for="(row, index) in paginated"
          :key="index"
          :style="index % 2 === 1 ? oddRowsStyleObject : ''"
        >
          <slot :row="row"></slot>
        </tr>
      </tbody>
    </table>
    <BasePagination
      :paginationInfo="paginationInfo"
      :currentPage="currentPage"
      @paginate="setCurrentPage"
    >
    </BasePagination>
  </div>
</template>

<script>
export default {
  name: "BaseDatatable",
  components: {},
  props: ["columns", "rows"],
  methods: {
    sortable(item) {
      return item?.isSortable ?? true;
    },
    getIndex(array, key, value) {
      return array.findIndex((i) => i[key] == value);
    },
    sortBy(key) {
      this.resetPagination();
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    },
    setSearch(value) {
      this.resetPagination();
      this.search = value;
    },
    setCurrentPage(value) {
      this.currentPage = value;
    },
    paginate(array, length, pageNumber) {
      return array.slice((pageNumber - 1) * length, pageNumber * length);
    },
    resetPagination() {
      this.currentPage = 1;
    },
  },
  data() {
    const sortOrders = {};
    this.columns.forEach((column) => {
      sortOrders[column.name] = -1;
    });
    const sortIndex = this.columns.findIndex((item) => this.sortable(item));

    const sortKey = sortIndex !== -1 ? this.columns[sortIndex].name : "";
    return {
      sortOrders,
      sortKey,
      search: "",
      itemsPerPage: 5,
      currentPage: 1,
      oddRowsStyleObject: {
        backgroundColor: "var(--color-grey-light)",
      },
    };
  },
  computed: {
    paginationInfo() {
      return {
        totalItemsArrayLength: this.rows.length,
        filteredItemsArrayLength: this.filteredItems.length,
        itemsPerPage: this.itemsPerPage,
      };
    },
    filteredItems() {
      let rows = this.rows;

      if (this.search) {
        rows = rows.filter((row) => {
          return Object.keys(row).some((key) => {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(this.search.toLowerCase()) > -1
            );
          });
        });
      }
      let sortKey = this.sortKey;
      let order = this.sortOrders[sortKey] || 1;
      if (sortKey) {
        rows = rows.slice().sort((a, b) => {
          let index = this.getIndex(this.columns, "name", sortKey);
          a = String(a[sortKey]).toLowerCase();
          b = String(b[sortKey]).toLowerCase();

          if (this.columns[index].type && this.columns[index].type === "date") {
            return (
              (a === b
                ? 0
                : new Date(a).getTime() > new Date(b).getTime()
                ? 1
                : -1) * order
            );
          } else if (
            this.columns[index].type &&
            this.columns[index].type === "number"
          ) {
            return (+a === +b ? 0 : +a > +b ? 1 : -1) * order;
          } else {
            return (a === b ? 0 : a > b ? 1 : -1) * order;
          }
        });
      }
      return rows;
    },
    paginated() {
      return this.paginate(
        this.filteredItems,
        this.itemsPerPage,
        this.currentPage
      );
    },
  },
};
</script>

<style lang="scss">
.table {
  width: 100%;
  border-collapse: collapse;

  &__head {
    text-align: left;
    background-color: var(--color-green-light);
    color: white;
  }

  &__head-item {
    overflow: hidden;
    vertical-align: middle;
    padding: 0.5em;

    cursor: pointer;

    &--sorting,
    &--sorting-asc,
    &--sorting-desc {
      padding-right: 18px;
      position: relative;
    }

    &--sorting:before,
    &--sorting:after,
    &--sorting-asc:before,
    &--sorting-asc:after,
    &--sorting-desc:before,
    &--sorting-desc:after {
      border: 4px solid transparent;
      content: "";
      display: block;
      height: 0;
      right: 5px;
      top: 50%;
      position: absolute;
      width: 0;
    }

    &--sorting:before {
      border-bottom-color: #666;
      margin-top: -9px;
    }
    &--sorting:after {
      border-top-color: #666;
      margin-top: 1px;
    }

    &--sorting-asc:before {
      border-bottom-color: #666;
      margin-top: -9px;
    }
    &--sorting-desc:after {
      border-top-color: #666;
      margin-top: 1px;
    }
  }

  &__body {
    & > tr > td {
      padding: 0.3em 0.5em;
    }
    & > tr > td > a {
      transition: all 0.2s;

      color: inherit;
      &:hover {
        color: var(--color-green-light);
      }
    }
  }

  &__body > tr > td,
  &__head-item {
    border: 1px solid var(--color-green-light);
  }

  &__n-items-selector {
    background-color: var(--color-grey-light);
    border: 1px solid var(--color-grey-medium);
    border-radius: 8px;
    padding: 0.2em 0.3em;
    font-size: 1.5rem;

    &:focus {
      outline: none;
    }
  }
}
</style>
