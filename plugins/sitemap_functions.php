<?php
$lmsupdate = mysql_fetch_row(mysql_query("SELECT data FROM ".$pre."data WHERE field_type = 'plugin_sitemap' AND field_name = 'last_update'"));
$lupdate2 = time() - $lmsupdate[0];
$lupdate = round($lupdate2 / 86400);
if (!$lmsupdate[0] or $lupdate == $setting["sitemap_update"] or $lupdate > $setting["sitemap_update"]) {
unset($sm_contents);
$sm_contents .= "<?xml version='1.0' encoding='UTF-8'?>
<?xml-stylesheet type='text/xsl' href='".$siteurl."inc/gss.xsl'?>
<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:schemaLocation='http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd'>
<!--#Generated by AdaptCMS Sitemap Generator by Insane Visions, http://www.adaptcms.com, http://www.insanevisions.com -->
";
$larticle = mysql_fetch_row(mysql_query("SELECT date FROM ".$pre."content ORDER BY `id` DESC LIMIT 1"));
$urls .= $siteurl."
";
$sm_contents .= "<url><loc>".$siteurl."</loc><lastmod>".date("Y-m-d", $larticle[0])."</lastmod><changefreq>daily</changefreq><priority>1.00</priority></url>
";
$sql = mysql_query("SELECT * FROM ".$pre."content ORDER BY `id` DESC");
while($r = mysql_fetch_array($sql)) {
$urls .= url("content", $r[id], $r[name], $r[section])."
";
$sm_contents .= "<url><loc>".url("content", $r[id], $r[name], $r[section])."</loc><lastmod>".date("Y-m-d", $r[date])."</lastmod><changefreq>daily</changefreq><priority>0.50</priority></url>
";
}

$sql = mysql_query("SELECT * FROM ".$pre."sections ORDER BY `id` DESC");
while($r = mysql_fetch_array($sql)) {
unset($datem);
$datem = mysql_fetch_row(mysql_query("SELECT date FROM ".$pre."content WHERE section = '".$r[name]."' ORDER BY `id` DESC LIMIT 1"));
if ($datem[0]) {
$date3 = date("Y-m-d", $datem[0]);
} else {
$date3 = date("Y-m-d");
}
$urls .= url("section",$r[name])."
";
$sm_contents .= "<url><loc>".url("section",$r[name])."</loc><lastmod>".$date3."</lastmod><changefreq>daily</changefreq><priority>0.50</priority></url>
";

for ($character = 65; $character < 91; $character++) {
$sm_contents .= "<url><loc>".url("section",$r[name])."letter/".chr($character)."/</loc><lastmod>".$date3."</lastmod><changefreq>daily</changefreq><priority>0.50</priority></url>
";
}
}
$sm_contents .= "<url><loc>".url("section","")."</loc><lastmod>".date("Y-m-d", $larticle[0])."</lastmod><changefreq>daily</changefreq><priority>0.50</priority></url>
";
$urls .= url("section","")."
";

$sql = mysql_query("SELECT * FROM ".$pre."files ORDER BY `id` DESC");
while($r = mysql_fetch_array($sql)) {
$sm_contents .= "<url><loc>".url("media-file", $r[id], $r[filename])."</loc><lastmod>".date("Y-m-d", $r[date])."</lastmod><changefreq>monthly</changefreq><priority>0.50</priority></url>
";
}

$sql = mysql_query("SELECT * FROM ".$pre."media ORDER BY `id` DESC");
while($r = mysql_fetch_array($sql)) {
$date2 = mysql_fetch_row(mysql_query("SELECT date FROM ".$pre."files WHERE media_id = '".$r[id]."' ORDER BY `id` DESC LIMIT 1"));
if ($date2[0]) {
$dates = date("Y-m-d", $date2[0]);
} else {
$dates = date("Y-m-d");
}
$urls .= url("media-gallery", $r[id], $r[name])."
";
$sm_contents .= "<url><loc>".url("media-gallery", $r[id], $r[name])."</loc><lastmod>".$dates."</lastmod><changefreq>daily</changefreq><priority>0.50</priority></url>
";
$date2 = "";
}

$sql = mysql_query("SELECT * FROM ".$pre."pages ORDER BY `id` DESC");
while($r = mysql_fetch_array($sql)) {
$urls .= $mrw_1["page"].$r[url]."
";
$sm_contents .= "<url><loc>".url("page", $r[id], $r[name])."</loc><lastmod>".date("Y-m-d", $r[date])."</lastmod><changefreq>daily</changefreq><priority>0.50</priority></url>
";
}

$sql = mysql_query("SELECT * FROM ".$pre."users ORDER BY `id` DESC");
while($r = mysql_fetch_array($sql)) {
$urls .= $mrw_1["user"].$r[username]."
";
$sm_contents .= "<url><loc>".get_user($r[id])."</loc><lastmod>".date("Y-m-d", $r[date])."</lastmod><changefreq>daily</changefreq><priority>0.50</priority></url>
";
}

//<sitemap><loc>".$siteurl."sitemap.xml</loc></sitemap>
$sm_contents .= "
</urlset>";

$handles = @fopen($sitepath."sitemap.xml", "r");
$contentss = @fread($handles, filesize($sitepath."sitemap.xml"));
@fclose($handles);
if ($contentss != $sm_contents) {
$handle = fopen($sitepath."sitemap.xml", 'w');
fwrite($handle, $sm_contents);
fclose($handle);

$handle2 = fopen($sitepath."urllist.txt", 'w');
fwrite($handle2, $urls);
fclose($handle2);

$ping_url = urlencode($siteurl."sitemap.xml");

$google = "http://www.google.com/webmasters/sitemaps/ping?sitemap=".$ping_url;
$google_ping = fopen($google,'r');
while ($res = fread($google_ping,8192)){	
}
fclose($google_ping);

// $ask = "http://submissions.ask.com/ping?sitemap=".$ping_url;
// $ask_ping = fopen($ask,'r');
// while ($res = fread($ask_ping,8192)){	
// }
// fclose($ask_ping);

if ($setting["sitemap_yahoo_key"]) {
$yahoo = "http://search.yahooapis.com/SiteExplorerService/V1/updateNotification?appid=".$setting["sitemap_yahoo_key"]."&url=".$ping_url;
$yahoo_ping = fopen($yahoo,'r');
while ($res = fread($yahoo_ping,8192)){	
}
fclose($yahoo_ping);

$yahoo = "http://search.yahooapis.com/SiteExplorerService/V1/updateNotification?appid=".$setting["sitemap_yahoo_key"]."&url=".urlencode($siteurl."urllist.txt");
$yahoo_ping = fopen($yahoo,'r');
while ($res = fread($yahoo_ping,8192)){	
}
fclose($yahoo_ping);
}
if ($lmsupdate[0] == "") {
mysql_query("INSERT INTO ".$pre."data VALUES (null, 'last_update', 'plugin_sitemap', '".time()."', 0)");
} else {
mysql_query("UPDATE ".$pre."data SET data = '".time()."' WHERE field_name = 'last_update' AND field_type = 'plugin_sitemap'");
}
}
}
?>