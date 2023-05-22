<script lang="ts" setup></script>

<template>
  <div class="py-5 text-center">
    <h2>New product form</h2>
  </div>

  <form>
    <div class="row py-1">
      <div class="col-12">
        <label class="form-label" for="product-name">Product name</label>
        <input id="product-name" class="form-control" placeholder="" type="text" value="" />
        <div class="invalid-feedback">Valid first name is required.</div>
      </div>
    </div>
    <div class="row py-1">
      <div class="col-12">
        <label class="form-label" for="category-name">Category name</label>
        <input id="category-name" class="form-control" placeholder="" type="text" value="" />
        <div class="invalid-feedback">Category name is required.</div>
      </div>
    </div>

    <div class="row py-1">
      <div class="col-12">
        <label class="form-label" for="price">Price</label>
        <div class="input-group has-validation">
          <span class="input-group-text">$</span>
          <input id="price" class="form-control" placeholder="Price" type="text" />
          <div class="invalid-feedback">Price is required.</div>
        </div>
      </div>
    </div>

    <div class="row py-1">
      <div class="col-12">
        <label class="form-label" for="description">Description</label>
        <input
          id="description"
          class="form-control"
          placeholder="1234 Main St"
          required
          type="text"
        />
        <div class="invalid-feedback">Enter product description.</div>
      </div>
    </div>

    <div class="row py-1">
      <div class="col-12">
        <label class="form-label" for="product-image">Image link</label>
        <input
          id="product-image"
          class="form-control"
          placeholder="1234 Main St"
          required
          type="text"
        />
        <div class="invalid-feedback">Enter product description.</div>
      </div>
    </div>

    <hr class="my-4" />

    <button class="w-100 btn btn-primary btn-lg" type="submit">Submit</button>
  </form>
</template>
