import Head from 'next/head';

import { CMS_NAME } from '../lib/constants';
import Container from '../components/container';
import Layout from '../components/layout';
import PostHeader from '../components/post-header';
import PostBody from '../components/post-body';
import { getPostBySlug } from '../lib/api';
import markdownToHtml from '../lib/markdownToHtml';

export default function Index({ post }) {
  return (
    <>
      <Layout>
        <Head>
          <title>About {CMS_NAME}</title>
        </Head>
        <Container>
          {post && (
            <>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} />
            </>
          )}
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const post = getPostBySlug('README', [
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'content',
  ]);

  const content = await markdownToHtml(post.content || '');
  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}
