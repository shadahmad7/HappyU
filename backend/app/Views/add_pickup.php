<!DOCTYPE html>
<html>

<head>
  <title>Codeigniter 4 Add User With Validation Demo</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
  <style>
    .container {
      max-width: 500px;
    }

    .error {
      display: block;
      padding-top: 5px;
      font-size: 14px;
      color: red;
    }
  </style>
</head>

<body>
  <div class="container mt-5">
    <form method="post" id="add_create" name="add_create" 
    action="<?= site_url('/pickup/submit-form') ?>" enctype="multipart/form-data">
      <div class="form-group">
        <label>PickUp Name</label>
        <input type="text" name="name" class="form-control">
      </div>
       <div class="form-group">
        <label>PickUp Bikenumber</label>
        <input type="text" name="bikenumber" class="form-control">
      </div>
       <div class="form-group">
        <label>PickUp Bike Brand</label>
        <input type="text" name="bikebrand" class="form-control">
      </div>
       <div class="form-group">
        <label>PickUp Bike Model</label>
        <input type="text" name="bikemodel" class="form-control">
      </div>
       <div class="form-group">
        <label>Pickuo Address</label>
        <input type="text" name="address" class="form-control">
      </div>
       <div class="form-group">
        <label>Pick up date</label>
        <input type="text" name="date" class="form-control">
      </div>
      <div class="form-group">
        <label>Pick up time</label>
        <input type="text" name="time" class="form-control">
      </div>
      <div class="form-group">
        <label>Pick up Issue</label>
        <input type="text" name="issues" class="form-control">
      </div><div class="form-group">
        <label>Pick up service</label>
        <input type="text" name="services" class="form-control">
      </div>
      <div class="form-group">
        <label>Mobile number</label>
        <input type="text" name="mobileno" class="form-control">
      </div>

      <div class="form-group">
        <label>Image File</label>
        <input type="file" name="myfile" class="form-control">
      </div>
      <div class="form-group">
        <label>Status</label>
        <input type="text" name="status" class="form-control">
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-primary btn-block">Update Data</button>
      </div>
    </form>
  </div>

  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.2/jquery.validate.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.2/additional-methods.min.js"></script>
  <script>
    if ($("#add_create").length > 0) {
      $("#add_create").validate({
        rules: {
          name: {
            required: true,
          },
          email: {
            required: true,
            maxlength: 60,
            email: true,
          },
        },
        messages: {
          name: {
            required: "Name is required.",
          },
          email: {
            required: "Email is required.",
            email: "It does not seem to be a valid email.",
            maxlength: "The email should be or equal to 60 chars.",
          },
        },
      })
    }
  </script>
</body>

</html>