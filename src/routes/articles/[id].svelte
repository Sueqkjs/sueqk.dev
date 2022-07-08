<script>
  import { Row, Col } from "sveltestrap";

  export /**
   * @type {Article}
   */
  let article;
</script>

<svelte:head>
  <title>{article.title} - Sueqkjs</title>
  <meta name="description" content="SueqkjsのBlog" />
</svelte:head>

<Row>
  <Col>
    <h1>{article.title}</h1>
    <p>
      {article.publishedAt
        ? new Intl.DateTimeFormat("ja-jp", { dateStyle: "full", timeStyle: "long" }).format(
            new Date(article.publishedAt)
          )
        : ""}
    </p>
    <hr />
    {@html article.content}
  </Col>
</Row>
