<?php
$text = $_GET["sendData"];
$createFile = fopen("text.json", "w") or die("无法创建文件");
fwrite($createFile, $text);
