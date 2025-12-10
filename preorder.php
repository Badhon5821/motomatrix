<?php
// ---------- DB CONFIG ----------
$host = "localhost";
$user = "root";        // change if needed
$pass = "";           // change if needed
$dbname = "motomatrix";

// ---------- CONNECT ----------
$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

// ---------- GET FORM DATA ----------
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $product_name   = isset($_POST["product_name"])   ? trim($_POST["product_name"])   : "";
    $customer_name  = isset($_POST["customer_name"])  ? trim($_POST["customer_name"])  : "";
    $phone          = isset($_POST["phone"])          ? trim($_POST["phone"])          : "";
    $quantity       = isset($_POST["quantity"])       ? (int)$_POST["quantity"]        : 1;
    $notes          = isset($_POST["notes"])          ? trim($_POST["notes"])          : "";

    if ($customer_name === "" || $phone === "") {
        echo "<script>alert('Name and phone are required.'); window.history.back();</script>";
        exit();
    }

    // ---------- PREPARED STATEMENT ----------
    $stmt = $conn->prepare("INSERT INTO preorders (product_name, customer_name, phone, quantity, notes) VALUES (?, ?, ?, ?, ?)");
    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("sssis", $product_name, $customer_name, $phone, $quantity, $notes);

    if ($stmt->execute()) {
        // Success
        echo "<script>
                alert('Thank you! Your pre-order has been submitted. We will contact you soon.');
                window.location.href = 'index.html';
              </script>";
    } else {
        echo "<script>
                alert('Something went wrong. Please try again.');
                window.history.back();
              </script>";
    }

    $stmt->close();
}

$conn->close();
?>