import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

const Page = async () =>  {

    const result = await db.select().from(users);
    console.log(JSON.stringify(result, null, 2));

    return (
    <>
        <BookOverview {...sampleBooks[0]}/>
        <BookList
            title="Популярное"
            books={sampleBooks}
            containerClassName="mt-28"
        />
    </>
);
};

export default Page;