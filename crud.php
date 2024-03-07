
<?php
// Database connection details
$host = "localhost";
$username = "root";
$password = "";
$database = "pwa_crud";

// Create a connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to fetch all data from the database
function getData($conn) {
    $sql = "SELECT * FROM data";
    $result = $conn->query($sql);
    $data = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }
    return $data;
}

// Function to insert data into the database
function insertData($conn, $name, $email, $phone) {
    $sql = "INSERT INTO data (name, email, phone) VALUES ('$name', '$email', '$phone')";
    if ($conn->query($sql) === TRUE) {
        return true;
    } else {
        return false;
    }
}

// Function to update data in the database
function updateData($conn, $id, $name, $email, $phone) {
    $sql = "UPDATE data SET name='$name', email='$email', phone='$phone' WHERE id=$id";
    if ($conn->query($sql) === TRUE) {
        return true;
    } else {
        return false;
    }
}

// Function to delete data from the database
function deleteData($conn, $id) {
    $sql = "DELETE FROM data WHERE id=$id";
    if ($conn->query($sql) === TRUE) {
        return true;
    } else {
        return false;
    }
}

// Handle AJAX requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];
    switch ($action) {
        case 'get':
            $data = getData($conn);
            echo json_encode($data);
            break;
        case 'insert':
            $name = $_POST['name'];
            $email = $_POST['email'];
            $phone = $_POST['phone'];
            $result = insertData($conn, $name, $email, $phone);
            echo json_encode($result);
            break;
        case 'update':
            $id = $_POST['id'];
            $name = $_POST['name'];
            $email = $_POST['email'];
            $phone = $_POST['phone'];
            $result = updateData($conn, $id, $name, $email, $phone);
            echo json_encode($result);
            break;
        case 'delete':
            $id = $_POST['id'];
            $result = deleteData($conn, $id);
            echo json_encode($result);
            break;
    }
}

$conn->close();
?>