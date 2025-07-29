import NavTitle from "@/components/common/admin/reuseable/nav-title";
import EditBlog from "@/components/common/admin/view/edit-blog";
import { SlugParams } from "@/types";


export default async function VideoSingle({ params }: SlugParams) {
  const { slug } = await params;


  
  return (
    <div>
      <NavTitle
        title="Add Blogs"
        subTitle="You can manage your blogs of your website from here."
      />
     <EditBlog/>
    </div>
  );
}
