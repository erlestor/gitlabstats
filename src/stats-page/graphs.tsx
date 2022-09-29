import { useContext } from "react";
import { FilterOptionsContext } from ".";

export default function Graphs() {
  const { filterOptions } = useContext(FilterOptionsContext)!;

  return (
    <>
      <p>
        Timeframe: {filterOptions.selectedTimeFrame} | selected persons:{" "}
        {Object.keys(filterOptions.persons).reduce((acc: string[], cur) => {
            if (filterOptions.persons[cur]) {
                acc.push(cur);
            }
            return acc;
        }, []).join(", ")}
      </p>
      <h1>Commits per -</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi eaque
        eveniet, vero voluptate magnam delectus temporibus nihil nisi ducimus
        architecto suscipit reiciendis modi sint fuga commodi, soluta
        repellendus illum eum! Sapiente cum velit ut nemo asperiores porro
        temporibus optio aliquid doloribus modi recusandae, hic laudantium
        nesciunt quisquam quia repellendus quaerat magnam! Culpa vel at
        voluptate, consequatur iure ratione ad quibusdam? Harum possimus
        incidunt magni unde doloremque velit sunt doloribus, quod placeat earum
        ducimus optio voluptate, iusto, saepe corporis quia amet? Iure ratione
        quasi, ullam voluptatem corrupti minus fugiat maiores ipsa. Optio ullam
        expedita quae maxime, consequuntur reiciendis ipsam nihil quibusdam,
        animi fugit consequatur a accusamus esse nisi aspernatur dignissimos
        ratione adipisci repellat repellendus numquam illum ea? Repudiandae
        perspiciatis placeat nam dolor nobis laudantium eos voluptatem explicabo
        illo tenetur. Obcaecati officia culpa aliquam! Natus, nulla quam at hic
        quaerat officiis deleniti provident. Magnam deserunt eos libero atque
        velit, blanditiis dignissimos quod iste vitae minus nobis fugiat nam
        maxime, esse dolor. Optio repellat provident eum magnam alias, sed culpa
        debitis ea fuga esse cum, qui eius dolor voluptates, blanditiis
        eligendi. Sunt distinctio aspernatur eligendi ipsam? Omnis consectetur
        distinctio doloremque architecto eos aperiam assumenda earum repellendus
        iure, non fuga labore reprehenderit ut dolorum blanditiis error alias
        consequuntur sed exercitationem? Voluptate eveniet culpa illum, ipsum
        corrupti illo quod! Illo consequatur enim cupiditate possimus
        reprehenderit asperiores id ea eos, mollitia facere optio cum
        consequuntur fuga, voluptatibus modi dolore hic magni. Asperiores, modi
        placeat, natus blanditiis officiis rem laborum iste atque iure tempore
        itaque quia ut nam suscipit a! Delectus repudiandae eum molestiae vero
        temporibus adipisci magnam quod possimus ex corporis optio quam saepe,
        doloremque quae asperiores nisi repellendus quibusdam fugit distinctio
        fuga error inventore similique. Rem distinctio eveniet modi pariatur hic
        nemo ducimus, obcaecati, odio perspiciatis quam doloremque illo
        provident voluptas consectetur quis maiores illum beatae delectus facere
        ea consequatur odit mollitia saepe id. Pariatur sint dignissimos
        asperiores nesciunt ullam commodi, omnis architecto quo eius eligendi
        eveniet dolorem officia natus? Quidem assumenda aliquam et rem,
        architecto id labore harum, deserunt cumque velit dolores modi qui?
        Fugiat quia dolorem non, quaerat necessitatibus corrupti molestias aut
        ut sapiente libero doloribus nesciunt exercitationem vitae ipsum eos
        optio error labore omnis provident temporibus! Sed nihil ab impedit
        incidunt aperiam dolore ipsa consequuntur illo repellendus quasi optio
        perspiciatis enim necessitatibus est possimus ducimus, non doloremque
        saepe! Dolores nisi sint obcaecati consequuntur porro voluptatibus
        veritatis tempore qui repudiandae necessitatibus! Possimus suscipit
        soluta error aspernatur accusamus cum excepturi ipsam sunt corrupti
        facilis nulla laboriosam voluptates voluptatibus debitis labore nihil,
        eveniet assumenda accusantium, aliquid, eligendi sequi odit omnis
        dignissimos cupiditate. Cupiditate quis voluptate expedita beatae illum
        quod earum soluta magnam qui quasi perferendis veritatis facilis minus
        ipsum rerum, necessitatibus praesentium harum delectus exercitationem
        dolor. Aut saepe, omnis nihil fuga pariatur eveniet voluptatum, dolor
        eaque officia eligendi asperiores laboriosam soluta assumenda commodi
        nemo repellat. Aut ea nihil placeat facere suscipit quos assumenda saepe
        id, voluptates, quo quae, porro hic est. Obcaecati ea sapiente beatae
        quasi nostrum quibusdam sit ipsa inventore modi dignissimos, eaque ipsam
        ipsum, delectus mollitia quisquam ut doloribus qui fuga enim. Obcaecati
        velit itaque enim illum aperiam illo temporibus deleniti dolore amet
        odit cumque, vitae dolorum neque placeat reprehenderit nisi suscipit
        modi! Neque voluptatibus enim odio quia natus impedit aliquid architecto
        a molestiae corrupti eligendi libero voluptas vero doloribus doloremque
        quod blanditiis minus sunt, nam atque dolor magni saepe illum! Eaque, ex
        iusto voluptas laboriosam repellendus illum ullam. Delectus aliquam
        accusamus accusantium quos vitae, adipisci, neque sit provident eius
        natus temporibus necessitatibus, blanditiis reiciendis quo? Quae, neque,
        deserunt odit necessitatibus repellendus aut architecto explicabo
        assumenda omnis obcaecati sit possimus esse vitae maxime doloribus quas
        repudiandae quisquam facere exercitationem nulla voluptatum laboriosam
        id. Mollitia neque iusto libero omnis repudiandae! Odio illum, saepe
        consequatur consequuntur unde modi cumque provident ex! Accusamus sequi
        molestias cupiditate modi voluptatum, non beatae voluptate! Impedit,
        earum illo? Mollitia culpa quis aut ex sed aperiam harum repudiandae
        provident eum ducimus, accusamus natus voluptas dolore earum cum, iusto
        soluta quas. Blanditiis assumenda beatae nihil magnam provident, quis
        delectus distinctio optio expedita? Sequi quos rerum, quia doloribus ea
        molestias accusantium fugit at voluptas? Mollitia quam autem id eius
        natus fugiat ullam molestias, ea dolore amet inventore sed provident.
        Quo nihil earum dolore in unde, exercitationem aliquam, praesentium
        quibusdam odit, cum veritatis voluptate! Voluptatem sed, officia
        obcaecati sunt molestias autem repellendus nam, nobis voluptas eaque
        doloribus quo quibusdam perspiciatis sequi cupiditate nulla dolorum ut
        porro soluta, veniam fugit aperiam odio nesciunt excepturi? Eos
        repudiandae et nobis quas voluptas id ad a! Expedita voluptas
        consequuntur repudiandae corrupti ea doloribus praesentium itaque, fuga
        blanditiis aperiam voluptatem quis laborum rem, aliquid pariatur quasi
        voluptatibus. Incidunt esse consequuntur, maxime natus commodi facere
        sint animi pariatur distinctio sed culpa. Asperiores eum provident quis
        ipsum maiores voluptas ab aspernatur error architecto sapiente, debitis
        accusantium? Facilis totam reprehenderit ab ducimus nobis accusamus
        minima voluptatibus corporis perspiciatis, natus, non nulla beatae
        deserunt ad provident. Nulla aliquam similique repellat, vel
        necessitatibus ducimus. Eius, laboriosam! Adipisci ducimus explicabo
        architecto officia facilis.
      </p>
    </>
  );
}
